//tests/app.register.test.js
import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
// import registerRoute from '../src/routes/users/registerRoute.js';
// import db from '../src/config/db.js';
// import bcrypt from 'bcryptjs';
import {
  notFoundHandler,
  errorHandler,
} from '../src/middleware/errorHandler.js';

// jest.mock('../src/config/db.js');
// jest.mock('bcryptjs');

// Mock-moduler innan import
jest.unstable_mockModule('../src/config/db.js', () => ({
  default: { query: jest.fn() },
}));

jest.unstable_mockModule('bcryptjs', () => ({
  default: {
    hash: jest.fn(),
  },
}));

// Importera mockade moduler efter att mockningen är satt
const { default: registerRoute } = await import(
  '../src/routes/users/registerRoute.js'
);
const { default: db } = await import('../src/config/db.js');
const { default: bcrypt } = await import('bcryptjs');

const app = express();
app.use(express.json());
app.use(registerRoute);
app.use(notFoundHandler);
app.use(errorHandler);

describe('POST /auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 400 if any field is missing input', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@test.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: 'name', message: 'Name is required' }),
        expect.objectContaining({
          field: 'password',
          message: 'Password must be at least 8 characters long.',
        }),
      ])
    );
  });

  it('Should return 400 if email domain is invalid', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@notallowed.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          field: 'email',
          message: 'Email domain is not allowed.',
        }),
      ])
    );
  });

  it('Should register a new user and return 201 status', async () => {
    bcrypt.hash.mockResolvedValue('hashedPassword123');
    db.query.mockResolvedValueOnce({ rows: [] }); // If no existing user
    db.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          name: 'Test User',
          email: 'test@ica.se',
          password_hash: 'hashedPassword123',
          role: 'user',
        },
      ],
    });

    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@ica.se',
      password: 'Password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
    expect(res.body.user.email).toBe('test@test.com');
    expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 10);
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO users'),
      ['Test User', 'test@ica.se', 'hashedPassword123', 'user']
    );
  });

  it('Should return 400 if email already exists', async () => {
    db.query.mockResolvedValueOnce({
      rows: [
        {
          id: 1,
          name: 'Test User',
          email: 'existingemail@ica.se',
          password_hash: 'hashedPassword123',
        },
      ],
    });

    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'existingemail@ica.se',
      password: 'Password123',
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Email is already registered.');
  });

  it('Should handle database errors and call next(error)', async () => {
    db.query.mockRejectedValue(new Error('Database error'));
    bcrypt.hash.mockResolvedValue('hash');

    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@ica.se',
      password: 'Password123',
    });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Server Error');
    expect(res.body.error).toBe('Database error');
  });
});
