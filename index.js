const feedme = require('feedme');
const https = require('https');

module.exports = {
  getFeed,
  getStatusUpdates,
};


// takes userId
function getFeed(userId) {
  const url = `https://www.goodreads.com/user/updates_rss/${userId}`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const parser = new feedme(true);
      res.pipe(parser);
      parser.on('end', () => {
        return resolve(parser.done());
      });
    });
  });
}

function getStatusUpdates(userId) {
  return getFeed(userId)
  .then(feed=>feed.items.filter(item=>~item.guid.text.search('UserStatus')))
}
