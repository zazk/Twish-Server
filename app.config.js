module.exports.API = {
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
};

module.exports.PORT = process.env.PORT || 3000;
module.exports.HOST = '0.0.0.0';
module.exports.MAX_RESULTS = 20;
