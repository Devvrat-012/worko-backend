// jest.config.js
export default {
    coverageDirectory: 'coverage',
    moduleFileExtensions: ['js', 'mjs', 'json', 'jsx', 'ts', 'tsx'],
    setupFilesAfterEnv: ['./tests/setup.js'],
    testMatch: ['**/*.test.js', '**/*.spec.js'], 
    testTimeout: 10000,
    testPathIgnorePatterns: ['/node_modules/']
  };
  