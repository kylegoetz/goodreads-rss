const feedme = require('feedme');
const https = require('https');

module.exports = {
  getFeed,
  getReviews,
  getStatusUpdates,
  getWantToRead,
};

// takes userId
function getFeed(userId) {
  const url = `https://www.goodreads.com/user/updates_rss/${userId}`;
  return new Promise((resolve) => {
    https.get(url, (res) => {
      const parser = new feedme(true);
      res.pipe(parser);
      parser.on('end', () => {
        return resolve(parser.done());
      });
    });
  });
}

function getReviews(userId) {
  return _getByType(userId, 'Review');
}

function getStatusUpdates(userId) {
  return _getByType(userId, 'UserStatus');
}

function getWantToRead(userId) {
  return _getByType(userId, 'ReadStatus');
}

function _getByType(userId, type) {
  return getFeed(userId)
  .then(feed=>feed.items.filter(item=>~item.guid.text.search(type)));
}
}
