# Goodreads RSS parser

Goodreads provides an RSS feed for users.
This library provides utility functions to use
the feed.

My motivation for this was to write
scripts to react to my reading habits, such as
generate a Day One journal entry with a book review
template whenever I finished a book. The Goodreads
API is very limited and does not make this easy, but
the RSS feed contains the info I needed.

## Getting Started

These instructions will get you a copy of the
project up and running on your local machine for
development and testing purposes. See deployment
for notes on how to deploy the project on a live
system.

### Prerequisites

NodeJS, I suppose.

### Installing

`npm install goodreads-rss --save`

Here is an example of a script to fetch reading
progress updates (referred to by Goodreads as
"UserStatus") for Goodreads user # 123 and log
them to the console:

```
const goodreadsRss = require('goodreads-rss');
const userId = 123;

goodreadsRss.getStatusUpdates(userId)
.then((updates)=>console.log(updates));
```

If you install *node-goodreads*, a third-party library
for the Goodreads API, then you can get more
information about the updates like this:

```
const goodreadsRss = require('goodreads-rss');
const goodreads = require('node-goodreads');
const userId = 123;

const fakeSession = {};
const gr = goodreads.client({
	key: 'my-goodreads-key',
	secret: 'my-goodreads-secret'
});

goodreadsRss.getStatusUpdates(userId)
.then((updates)=>{
  updates.forEach((update)=>{
    gr.getUserStatus(update.guid.text.split('UserStatus')[1]);
  });
});
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Kyle Goetz** - *Initial work* - [KyleGoetz](https://github.com/kylegoetz);

## License

This project is licensed under the ISC license.
