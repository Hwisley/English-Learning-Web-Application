const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

const customJestConfig = {
  // Setup file that runs before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Allow absolute imports
  moduleDirectories: ['node_modules', '<rootDir>'],

  // Exclude specific paths from testing
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],

  // Use jsdom test environment (required for frontend testing)
  testEnvironment: 'jest-environment-jsdom',

  // Transform for modern JS/TS using SWC
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest'],
  },

  // Module alias and asset handling
  moduleNameMapper: {
    // CSS Modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    // Regular CSS (non-module)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    // Static assets
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
};

// Export the configuration
module.exports = createJestConfig(customJestConfig);
