require("dotenv").config();
const getFrase = require("./src/phrase");
const { client, tweet } = require("./src/twitter");
// const INTERVALO = 5000 // meia hora 1800000

// Manda um tweet a cada 30 minutos
// async function Main() {
//     while (true) {
//       await new Promise(resolve => setTimeout(resolve, INTERVALO));
//       const frase = getFrase()
//       console.log(`Mandando Tweet:\t${frase}`)
//       tweet(frase)
//       console.log("Tweet enviado!\n")
//     }
// }

// Main();

const frase = getFrase()
console.log(`Mandando Tweet:\t${frase}`)
tweet(frase)
console.log("Tweet enviado!\n")
