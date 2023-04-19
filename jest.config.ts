export default {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },

  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
