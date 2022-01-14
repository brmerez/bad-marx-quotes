const words = require("./params/words.json");
const templates = require("./params/templates.json");
const Sentencer = require("sentencer");

const pick = arr => arr[Math.floor(Math.random() * arr.length)]; // Função de utilidade pra retornar um elemento aleatório de um array

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

const getFrase = () => Sentencer.make(pick(templates));

module.exports = getFrase