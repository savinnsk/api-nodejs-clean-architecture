/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
module.exports = {
  clearMocks: true,
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  transform: {
    ".+\\ts$": "ts-jest",
  },
}
