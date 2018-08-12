const Twit = require('twit');
const { API, PORT, MAX_RESULTS } = require('./app.config');

// setup Twitter Client
const T = new Twit(API);

var express = require('express');
var app = express();

// get term
app.get('/search/:term', function(req, res) {
  getTweets(req.params.term, res);
});

app.listen(PORT);
console.log(`Listening on port ${PORT}`);

//  search twitter for all tweets containing the term.
const getTweets = (term, res) => {
  T.get(
    'search/tweets',
    { q: `${term} since:2011-07-11`, count: MAX_RESULTS },
    (err, data, response) => {
      console.warn(err, response);
      if (data.statuses) {
        res.json(parseData(data.statuses));
      }
    }
  );
};

const parseData = tweets => {
  return tweets.map(tweet => ({
    text: tweet.text,
    user: tweet.user.screen_name,
    id: tweet.id_str
  }));
};
