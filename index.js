require("dotenv").config();
const words = require("./src/params/words.json");
const templates = require("./src/params/templates.json");
const Sentencer = require("sentencer");
const Twitter = require("twitter");

// Instanciar cliente do Twitter
const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

const pick = arr => arr[Math.floor(Math.random() * arr.length)]; // Função de utilidade pra retornar um elemento aleatório de um array


// Actions do Sentencer
Sentencer.configure({
    actions:{
        people: () => pick(words.people),
        anti: () => pick(["", "anti-"]),
        concepts: () => pick(pick([words.concepts.fem, words.concepts.masc])),
        mconcepts: () => pick(words.concepts.masc),
        fconcepts: () => pick(words.concepts.fem),
        adjectives: () => pick(pick([words.adjectives.fem, words.adjectives.masc])),
        madjectives: () => pick(words.adjectives.masc),
        fadjectives: () => pick(words.adjectives.fem),
        date: () => `${Math.floor(Math.random() * (1985 - 1868) + 1868)}`
    }
});

// async function loop() {
//     while (true) {
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log(Sentencer.make(pick(templates)) + "\n")
//     }
//   }
  
// loop();

const phrase = Sentencer.make(pick(templates));

console.log(`Mandando tweet:\t ${phrase}`);
client.post('statuses/update', {status: phrase}, (error, tweet, response) => {
  if(error) throw error;
  console.log("Tweet mandado com sucesso!");
})

