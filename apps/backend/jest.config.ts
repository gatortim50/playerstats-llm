import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",                  // Use ts-jest to compile TypeScript
  testEnvironment: "node",           // Set test environment for Node.js
  testMatch: ["**/*.test.ts"],       // Match test files with .test.ts extension
  verbose: true,                     // Show detailed test results
  collectCoverage: true,             // Enable coverage reporting
  coverageDirectory: "coverage",     // Output directory for coverage reports
  moduleFileExtensions: ["ts", "js"] // Recognize TypeScript and JavaScript files
};

export default config;