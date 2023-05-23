export default {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts", "!<rootDir>/src/main/**"],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  preset: "ts-jest",
  moduleDirectories: ["node_modules", "<rootdir>/src"],
  
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
