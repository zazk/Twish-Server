const Twit = require('twit');
const PORT = 3000;
const MAX_RESULTS = 20;

const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
});

var express = require('express');
var app = express();

app.get('/hello/:term', function(req, res) {
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
