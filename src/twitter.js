require("dotenv").config();
const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const tweet = text => client.post('statuses/update', {status: text}, (error, tweet, response) => {if(error) throw error});

module.exports = { client, tweet }
