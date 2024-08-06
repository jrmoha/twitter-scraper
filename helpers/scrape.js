import { launch } from "puppeteer";
import { parseTweets } from "./parseInput.js";

export const scrape = async function scrape(url, ticker) {
  let cnt = 0;
  try {
    const browser = await launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForSelector('[data-testid="tweet"]');
    await page.evaluate("window.scrollBy(0, 1500)");
    const tw = await page.$$('[data-testid="tweet"]');
    const text = await parseTweets(tw);
    text.forEach((e) => {
      if (e.text.includes(ticker)) {
        cnt++;
      }
    });
    await browser.close();
  } catch (err) {
    console.log(err);
  }
  return cnt;
};
