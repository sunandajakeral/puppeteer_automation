const puppeteer = require("puppeteer");

async function launchBrowser() {
  const browser = await puppeteer.launch({
    executablePath:
      "node_modules/chromium/lib/chromium/chrome-mac/Chromium.app/Contents/MacOS/Chromium", // Replace with the path to the Chromium executable
  });
  const page = await browser.newPage();

  return [browser, page];
}

module.exports = { launchBrowser };
