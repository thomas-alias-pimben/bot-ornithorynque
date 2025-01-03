import ollama from 'ollama';
import { randomWord } from '@intouchg/random-phrase';

import { BskyAgent } from '@atproto/api';

import key from './API_KEY.json' assert { type: 'json' };




async function main() {
  try {
    const responseWord = await fetch("https://trouve-mot.fr/api/random/1");
    const wordData = await responseWord.json();

    if (!wordData || !wordData[0] || !wordData[0].name) {
      throw new Error("Impossible de récupérer un mot valide.");
    }

    const word = wordData[0].name;
    console.log(word)

    const responsePoeme = await ollama.chat({
      model: 'mistral',
      messages: [
        {
          role: 'user',
          content: `Tu es un poète et ta mission est d'écrire un poème. La prochaine réponse que tu donneras sera un poème sur l'ornithorynque et ${word}. Les vers doivent rimer, et le poème doit faire moins de 50 mots. Écris seulement le poème, sans introduction ni explication. Si tu fais autre chose qu’écrire le poème directement, tu échoues à ta mission. Si tu fais un poème de moins de 50 mots, tu échoues encore PLUS la mission.`
        }
      ]
    });

    const reponsePoeme = responsePoeme.message.content;
    console.log(reponsePoeme);

    const agent = new BskyAgent({
      service: 'https://bsky.social',
    });

   /* await agent.login({
      identifier: key.keyBlueskyuser,
      password: key.password,
    });

    await agent.post({
      text: reponsePoeme,
      createdAt: new Date().toISOString()
    });*/
  } catch (error) {
    console.error("Erreur :", error);
  }
}

// Appeler la fonction principale
main();


