import puppeteer from "puppeteer";
import parseAccounts from "./helpers/parseAccount.js";
import twitterAccounts from "./data/twitterAccounts.js";
import { searchTweet } from "./helpers/searchTweet.js";

let TICKER = process.argv[2];
let MINUTES = parseInt(process.argv[3], 10);
if (!TICKER || !MINUTES) {
  // console.log("Please provide a ticker and a time interval in minutes");
  // process.exit(1);
  TICKER ??= "$TSLA";
  MINUTES ||= 15;
}
const INTERVAL = MINUTES * 60 * 1000; // 15 minutes

const getTweets = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0);

  const tweets = await parseAccounts(page, twitterAccounts);
  await browser.close();

  return tweets;
};

const main = async () => {
  try {
    let tweets = await getTweets();
    let count = 0;
    for (let tweet of tweets) {
      count += searchTweet(tweet, TICKER);
    }
    console.log(
      `"${TICKER}" was mentioned "${count}" times in the last ${MINUTES} minutes.`
    );
  } catch (e) {
    console.error(e);
  }
};
console.log(`Starting to scrape for ${TICKER} every ${MINUTES} minutes...`);
main();
setInterval(main, INTERVAL);
