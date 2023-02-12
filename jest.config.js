/* globals module */
const PORT = 9000;

module.exports = {
  preset: "jest-puppeteer",
  globals: { URL: `http://localhost:${PORT}` },
  verbose: true,
  testMatch: ["**/tests/**/*.test.js"],
  modulePaths: [".", "./node_modules"],
  testTimeout: 200000,
};