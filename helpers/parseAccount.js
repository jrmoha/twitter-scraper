import { Page } from "puppeteer";
/** parse all the tweets from the accounts
 *
 * @param {Page} page
 * @param {string[]} accounts
 * @returns {Promise<string[]>}
 */
async function parseAccounts(page, accounts) {
  const tweetsArray = [];
  for (const url of accounts) {
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight + 3000);// get more tweets
    });
    const allTweetContents = await page.$$eval(
      'article[data-testid="tweet"]',
      (data) => {
        return data.map((tweet) => tweet.textContent).join("\n");
      }
    );
    tweetsArray.push(allTweetContents.toString());
  }

  return tweetsArray;
}

export default parseAccounts;
