// jest.config.js
/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  clearMocks: true,          // ✅
  verbose: true,
  extensionsToTreatAsEsm: ['.js'],
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
};

