// tests/app.login.test.js
import { beforeEach, describe, jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { notFoundHandler, errorHandler } from '../src/middleware/errorHandler.js';

process.env.JWT_SECRET = 'testsecret';

jest.unstable_mockModule('../src/config/db.js', () => ({
  default: { query: jest.fn() },
}));

jest.unstable_mockModule('bcryptjs', () => ({
  default: { compare: jest.fn() },
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: { sign: jest.fn(() => 'fake.jwt.token') },
}));

const { default: loginRoute } = await import('../src/routes/users/loginRoute.js');
const { default: db } = await import('../src/config/db.js');
const { default: bcrypt } = await import('bcryptjs');
const { default: jwt } = await import('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(loginRoute);
app.use(notFoundHandler);
app.use(errorHandler);

describe('POST /auth/login', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 when email or password is missing', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      message: 'Email and password are required to login.',
    });
    expect(db.query).not.toHaveBeenCalled();
  });

  it('returns 401 when user is not found', async () => {
    // Din controller gör två SELECT just nu
    db.query
      .mockResolvedValueOnce({ rows: [], rowCount: 0 })
      .mockResolvedValueOnce({ rows: [], rowCount: 0 });

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'nouser@example.com', password: 'Somepass123' });

    expect(db.query).toHaveBeenCalledTimes(2);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: 'Invalid email.' });
  });

  it('returns 401 when password is incorrect', async () => {
    const userRow = {
      id: 1,
      name: 'Test User',
      email: 'john@example.com',
      password_hash: 'hashedPassword123',
      role: 'user',
    };

    db.query
      .mockResolvedValueOnce({ rows: [userRow], rowCount: 1 })
      .mockResolvedValueOnce({ rows: [userRow], rowCount: 1 });

    bcrypt.compare.mockResolvedValueOnce(false);

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com', password: 'WrongPass1' });

    expect(bcrypt.compare).toHaveBeenCalledWith('WrongPass1', 'hashedPassword123');
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: 'Invalid password.' });
  });

  it('returns 200, creates a token, and includes it in the body on successful login', async () => {
    const userRow = {
      id: 1,
      name: 'Test User',
      email: 'john@example.com',
      password_hash: 'hashedPassword123',
      role: 'user',
    };

    db.query
      .mockResolvedValueOnce({ rows: [userRow], rowCount: 1 })
      .mockResolvedValueOnce({ rows: [userRow], rowCount: 1 });
    bcrypt.compare.mockResolvedValueOnce(true);

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com', password: 'MySecurePassword123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: 'Login successful',
      token: 'fake.jwt.token',
    });

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 1, role: 'user' },
      'testsecret',
      { expiresIn: '1h' }
    );
  });

  it('returns 500 when DB throws inside try (second SELECT)', async () => {
    const userRow = {
      id: 1,
      name: 'Test User',
      email: 'john@example.com',
      password_hash: 'hashedPassword123',
      role: 'user',
    };

    db.query
      .mockResolvedValueOnce({ rows: [userRow], rowCount: 1 })
      .mockRejectedValueOnce(new Error('Database error'));

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com', password: 'Whatever123' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      message: 'Server Error',
      error: 'Database error',
    });
  });

  it('returns 500 when bcrypt.compare throws', async () => {
    const userRow = {
      id: 1,
      name: 'Test User',
      email: 'john@example.com',
      password_hash: 'hashedPassword123',
      role: 'user',
    };

    db.query
      .mockResolvedValueOnce({ rows: [userRow], rowCount: 1 })
      .mockResolvedValueOnce({ rows: [userRow], rowCount: 1 });

    bcrypt.compare.mockRejectedValueOnce(new Error('bcrypt error'));

    const res = await request(app)
      .post('/auth/login')
      .send({ email: 'john@example.com', password: 'Whatever123' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({
      message: 'Server Error',
      error: 'bcrypt error',
    });
  });
});
