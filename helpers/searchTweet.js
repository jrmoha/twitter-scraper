/**
 * Searches a tweet for a ticker symbol
 * @param {string} tweet
 * @param {string} ticker
 * @returns {number} the number of times the ticker was mentioned in the tweet
 */

const searchTweet = (tweet, ticker) => {
  const t = ticker.slice(1);
  const regex = new RegExp(`\\$?${t}`, "gi");
  const matches = tweet.match(regex);
  return matches ? matches.length : 0;
};

export { searchTweet };
