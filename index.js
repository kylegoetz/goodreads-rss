const feedme = require('feedme');
const https = require('https');

module.exports = {
  getFeed,
  getReviews,
  getStatusUpdates,
  getWantToRead,
  since,
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
  .then((feed)=>{
    feed.items = feed.items.filter(item=>~item.guid.text.search(type));
    return feed;
  });
}

/*
 Used as utility fn to generate a callback to send to promise
 returned by above. Filters out items not newer than given date.
 Accepts date as any form that the Date() constructor accepts
 Example: getStatusUpdates().then(since(new Date()))
*/
function since(date) {
  return (feed) => {
    const items = feed.items
      .filter(item=>new Date(item.pubdate) > new Date(date));
    return Object.assign({}, feed, {items});
  };
}
