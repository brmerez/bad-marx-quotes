require("dotenv").config()
const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
    organization: process.env.GPT_API_ID,
    apiKey: process.env.GPT_API_SECRET
});

const openai = new OpenAIApi(config);

module.exports = openai;