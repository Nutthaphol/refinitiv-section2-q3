const puppeteer = require("puppeteer");
const process = require("process");

const scrape = async (value) => {
  let result;
  const browser = await puppeteer.launch({});
  const page = await browser.newPage();
  await page.goto("https://codequiz.azurewebsites.net/");
  await page.click("body > input[type=button]");
  for (let i = 2; i <= 5; i++) {
    let element = await page.waitForSelector(
      `body > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`
    );
    let text = await page.evaluate((element) => element.textContent, element);
    if (text.includes(value)) {
      let elementAns = await page.waitForSelector(
        `body > table > tbody > tr:nth-child(${i}) > td:nth-child(2)`
      );
      result = await page.evaluate(
        (element) => element.textContent,
        elementAns
      );
      break;
    }
  }
  browser.close();
  console.log(result);
};

const words = process.argv;
const keys = words[2];

scrape(keys);
