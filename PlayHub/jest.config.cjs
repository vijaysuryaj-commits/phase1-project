module.exports ={
  testEnvironment: 'jest-environment-jsdom', // Simulates a browser environment
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transforms .js and .jsx files using Babel
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss|png|jpg|gif|webp|svg)$': 'identity-obj-proxy', // Mocks CSS/asset imports
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // Runs this file after the test environment is set up
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'], // Pattern to find test files
  transformIgnorePatterns: [
    "node_modules/(?!(enzyme|react-redux|react-router-dom)/)"
  ],
};