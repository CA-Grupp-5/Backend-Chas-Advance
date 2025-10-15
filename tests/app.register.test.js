import request from 'supertest';
import express from 'express';
import registerRoute from '../src/routes/users/registerRoute.js';
import db from '../src/config/db';
import bcrypt from 'bcryptjs';

jest.mock('../src/config/db');
jest.mock('bcryptjs');

const app = express();
app.use(express.json());
app.use(registerRoute);

describe('POST /auth/register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 400 if any field is missing input', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({ email: 'test@test.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(
      'Name, email and password are required to register user.'
    );
  });

  it('Should register a new user and return 201 status', async () => {
    bcrypt.hash.mockResolvedValue('hashedPassword123');
    db.query.mockResolvedValue({
      rows: [
        {
          id: 1,
          name: 'Test User',
          email: 'test@test.com',
          password_hash: 'hashedPassword123',
          role: 'user',
        },
      ],
    });

    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User registered successfully');
    expect(res.body.user.email).toBe('test@test.com');
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(db.query).toHaveBeenCalledTimes(1);
  });

  it('Should handle database errors and call next(error)', async () => {
    db.query.mockRejectedValue(new Error('Databse error'));
    bcrypt.hash.mockResolvedValue('hash');

    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    });

    expect(res.statusCode).toBe(500);
  });
});
