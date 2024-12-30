import ollama from 'ollama';
import { randomWord } from '@intouchg/random-phrase';

import { BskyAgent } from '@atproto/api';

// Importation JSON avec assertion
import key from './API_KEY.json' assert { type: 'json' };

const word = randomWord();

const response = await ollama.chat({
  model: 'llama3.1',
  messages: [
    {
      role: 'user',
      content: "Tu es un auteur de poème et il faut absolument que tu écrives un poème la prochaine réponse que tu me donneras sera un poème sur l'ornithorynque et " + word + " (le deuxieme mot est en anglais mais traduit le en fra,nçais avant de l'utilisé ) (les vers doivent rimer) tu devras seulement me donner le poème et uniquement le poème, les phrases de politesse ne sont pas les bienvenues il doit faire moins de 50 mots"
    }
  ],
});
console.log(word);
let reponsepoeme = response.message.content;
console.log(reponsepoeme);

const agent = new BskyAgent({
  service: 'https://bsky.social',
});
await agent.login({
  identifier: key.keyBlueskyuser,
  password: key.password,
});

await agent.post({
  text: reponsepoeme,
  createdAt: new Date().toISOString()
})
