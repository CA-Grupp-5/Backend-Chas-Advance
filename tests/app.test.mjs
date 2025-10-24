//tests/app.test.js
import request from 'supertest';
import app from '../src/app.js';

describe('GET /', () => {
  it('should return API is running...', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('API is running...');
  });
});

// tests/placeholder2.test.js
// describe('Placeholder Test Suite 2', () => {
//   test('should calculate sum correctly', () => {
//     const result = 2 + 3;
//     expect(result).toBe(5);
//   });

//   test('should verify array contains item', () => {
//     const fruits = ['apple', 'banana', 'cherry'];
//     expect(fruits).toContain('banana');
//   });
// });
