//tests/app.postlogs.test.js
import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import {
  notFoundHandler,
  errorHandler,
} from '../src/middleware/errorHandler.js';

jest.unstable_mockModule('../src/config/db.js', () => ({
  default: {
    query: jest.fn(),
  },
}));

const { default: postLogsRoute } = await import(
  '../src/routes/sensor-logs/postLogsRoute.js'
);
const { default: mockedDb } = await import('../src/config/db.js');

const app = express();
app.use(express.json());
app.use(postLogsRoute);
app.use(notFoundHandler);
app.use(errorHandler);

describe('POST /packages/:id/logs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should return 400 if packageId is missing or is invalid format', async () => {
    const res = await request(app)
      .post('/packages/abc/logs')
      .send({ temperature: 20, humidity: 55 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('A valid package ID is required.');
  });

  it('Should return 400 if temperature or humidity is missing', async () => {
    const res = await request(app)
      .post('/packages/1/logs')
      .send({ temperature: 20 });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Temperature and humidity are required.');
  });

  it('Should return 404 if package with the inserted ID does not exist', async () => {
    mockedDb.query.mockResolvedValue({ rows: [] });

    const res = await request(app)
      .post('/packages/999/logs')
      .send({ temperature: 20, humidity: 55 });
  });

  it('Should insert sensor logs and return 200 status', async () => {
    const mockPackage = { id: 1 };
    const mockLog = {
      id: 1,
      package_id: 1,
      temperature: 20,
      humidity: 55,
      timestamp: '2025-10-16T12:00:00Z',
    };

    mockedDb.query.mockResolvedValueOnce({ rows: [mockPackage] });
    mockedDb.query.mockResolvedValueOnce({ rows: [mockLog] });

    const res = await request(app)
      .post('/packages/1/logs')
      .send({ temperature: 20, humidity: 55 });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Sensor logs added successfully.');
    expect(res.body.logs).toEqual(mockLog);
    expect(mockedDb.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO sensors'),
      ['1', 20, 55]
    );
  });

  it('Should return 500 error if insert is failed and does not return a value', async () => {
    const mockPackage = { id: 4 };
    mockedDb.query.mockResolvedValueOnce({ rows: [mockPackage] });
    mockedDb.query.mockResolvedValueOnce({ rows: [] });

    const res = await request(app)
      .post('/packages/4/logs')
      .send({ temperature: 20, humidity: 55 });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Failed to insert sensor log.');
  });

  it('Should handle database errors and call next(error)', async () => {
    mockedDb.query.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .post('/packages/1/logs')
      .send({ temperature: 20, humidity: 55 });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Server Error');
    expect(res.body.error).toBe('Database error');
  });
});
