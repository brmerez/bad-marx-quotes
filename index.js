require("dotenv").config();
const getFrase = require("./src/phrase");
const { client, tweet } = require("./src/twitter");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000

const INTERVALO = 3600000 // meia hora 1800000

function sendTweet(){
  const frase = getFrase();
  tweet(frase);
  console.log(`Sent tweet:\t${frase}`);
}

app.get("/", (req, res)=>{
  res.send(`<h1>${getFrase()}</h1>`);
})

app.get("/mandalavai", (req, res)=>{
  sendTweet();
  res.send(`<h1>${getFrase()}</h1>`);
});

setInterval(sendTweet, INTERVALO);

app.listen(PORT, ()=> console.log("Listening on " + PORT));
