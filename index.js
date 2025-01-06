import { randomWord } from '@intouchg/random-phrase';

import { BskyAgent } from '@atproto/api';

import key from './API_KEY.json' assert { type: 'json' };

import { platipuspoemer } from './gemini.js';



async function main() {
  try {
    const responseWord = await fetch("https://trouve-mot.fr/api/random/1");
    const wordData = await responseWord.json();

    if (!wordData || !wordData[0] || !wordData[0].name) {
      throw new Error("Impossible de récupérer un mot valide.");
    }

    const word = wordData[0].name;
    console.log(word)

    const reponsePoeme = await platipuspoemer(word);
    console.log(reponsePoeme);

    const agent = new BskyAgent({
      service: 'https://bsky.social',
    });

    await agent.login({
      identifier: key.keyBlueskyuser,
      password: key.password,
    });

    await agent.post({
      text: reponsePoeme,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Erreur :", error);
  }
}

// Appeler la fonction principale
main();


