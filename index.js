require("dotenv").config();
const { getFrase, pick } = require("./src/phrase");
const { client, tweet } = require("./src/twitter");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000
const ai = require("./src/ai");
const words = require("./src/params/words.json");

const INTERVALO = 3600000 // meia hora 1800000

const getAIFrase = async () => {
   const res = await ai.createCompletion("text-davinci-001", { prompt: `crie um tweet baseado nos termos ${pick(pick([words.concepts.masc, words.concepts.fem]))}, ${pick(pick([words.adjectives.masc, words.adjectives.fem]))}  e ${pick(words.people)}`, max_tokens: 64 });
   return res.data;
}

async function generateTweet(){
   let data = await getAIFrase();
   if(data.choices[0].finish_reason === "lenght") return generateTweet();
   const frase = data.choices[0].text;
   return frase;
}

async function sendTweet() {
   const _tweet = await generateTweet();
   tweet(_tweet);
   console.log(`Sent tweet:\t${_tweet}`);
   return _tweet;
}

app.get("/", async (req, res) => {
   const tweet = await generateTweet();
   console.log(tweet);
   res.send(`<h1>${tweet}</h1>`);
})

app.get("/mandalavai", async (req, res) => {
   const _tweet = await sendTweet();
   console.log(_tweet);
   res.send(`<h1>${_tweet}</h1>`);
});

setInterval(sendTweet, INTERVALO);

app.listen(PORT, () => console.log("Listening on " + PORT));
