/* globals module */

const PORT = 14568;

module.exports = {
  launch: {
    headless: true,
    // executablePath: "/usr/bin/google-chrome-stable",
    args: [
      "--ignore-certificate-errors",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
    ],
  },
  browserContext: "incognito",
  // server: {
  //   command: `python3 -m http.server --directory public/ ${PORT} && sleep 30s;`,
  //   port: PORT,
  //   launchTimeout: 10000,
  // },
  devtools: true,
};