//tests/app.postlogs.test.js
// import request from 'supertest';
// import express from 'express';
// import postLogsRoute from '../src/routes/sensor-logs/postLogsRoute.js';
// import db from '../src/config/db.js';
// import { errorHandler } from '../src/middleware/errorHandler.js';

// jest.mock('../src/config/db.js');

// const app = express();
// app.use(express.json());
// app.use(postLogsRoute);
// app.use(errorHandler);

// describe('POST /packages/:id/logs', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('Should return 400 if packageId is missing or is invalid format', async () => {
//     const res = await request(app)
//       .post('/packages/abc/logs')
//       .send({ temperature: 20, humidity: 55 });

//     expect(res.status).toBe(400);
//     expect(res.body.message).toBe('A valid package ID is required.');
//   });

//   it('Should return 400 if temperature or humidity is missing', async () => {
//     const res = await request(app)
//       .post('/packages/1/logs')
//       .send({ temperature: 20 });

//     expect(res.status).toBe(400);
//     expect(res.body.message).toBe('Temperature and humidity are required.');
//   });

//   it('Should insert sensor logs and return 201 status', async () => {
//     const mockLog = {
//       id: 1,
//       package_id: 1,
//       temperature: 20,
//       humidity: 55,
//       timestamp: '2025-10-16T12:00:00Z',
//     };

//     db.query.mockResolvedValue({ rows: [mockLog] });

//     const res = await request(app)
//       .post('/packages/1/logs')
//       .send({ temperature: 20, humidity: 55 });

//     expect(res.status).toBe(201);
//     expect(res.body.message).toBe('Sensor logs added successfully');
//     expect(res.body.logs).toEqual(mockLog);
//     expect(db.query).toHaveBeenCalledWith(
//       expect.stringContaining('INSERT INTO sensors'),
//       [1, 20, 55]
//     );
//   });

//   it('Should return 500 error if insert is failed and does not return a value', async () => {
//     db.query.mockResolvedValue({ rows: [] });

//     const res = await request(app)
//       .post('/packages/1/logs')
//       .send({ temperature: 20, humidity: 55 });

//     expect(res.status).toBe(500);
//     expect(res.body.message).toBe('Failed to insert sensor log.');
//   });

//   it('Should handle database errors and call next(error)', async () => {
//     db.query.mockRejectedValue(new Error('Database error'));

//     const res = await request(app)
//       .post('/packages/1/logs')
//       .send({ temperature: 20, humidity: 55 });

//     expect(res.status).toBe(500);
//     expect(res.body.message).toBe('Internal server error');
//   });
// });


// tests/app.postlogs.test.js
import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import { errorHandler } from '../src/middleware/errorHandler.js';

// 1) Mocka ESM-modulen FÖRE den importeras av routern
await jest.unstable_mockModule('../src/config/db.js', () => ({
  default: { query: jest.fn() },
}));

// 2) Importera den mockade modulen och routern dynamiskt (efter mocken)
const { default: db } = await import('../src/config/db.js');
const { default: postLogsRoute } = await import(
  '../src/routes/sensor-logs/postLogsRoute.js'
);

// 3) Sätt upp en isolerad app-instans för denna testfil
const app = express();
app.use(express.json());
app.use(postLogsRoute);
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

  it('Should insert sensor logs and return 201 status', async () => {
    const mockLog = {
      id: 1,
      package_id: 1,
      temperature: 20,
      humidity: 55,
      timestamp: '2025-10-16T12:00:00Z',
    };

    db.query.mockResolvedValue({ rows: [mockLog] });

    const res = await request(app)
      .post('/packages/1/logs')
      .send({ temperature: 20, humidity: 55 });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Sensor logs added successfully');
    expect(res.body.logs).toEqual(mockLog);
    expect(db.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO sensors'),
      [1, 20, 55]
    );
  });

  it('Should return 500 error if insert is failed and does not return a value', async () => {
    db.query.mockResolvedValue({ rows: [] });

    const res = await request(app)
      .post('/packages/1/logs')
      .send({ temperature: 20, humidity: 55 });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Failed to insert sensor log.');
  });

  it('Should handle database errors and call next(error)', async () => {
    db.query.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .post('/packages/1/logs')
      .send({ temperature: 20, humidity: 55 });

    expect(res.status).toBe(500);
    expect(res.body.message).toBe('Internal server error');
  });
});
