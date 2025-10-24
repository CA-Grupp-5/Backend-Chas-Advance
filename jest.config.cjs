// jest.config.cjs
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  clearMocks: true,          // ✅
  verbose: true,
  extensionsToTreatAsEsm: ['.js'],
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
};

