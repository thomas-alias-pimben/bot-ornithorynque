import ollama from 'ollama'
import { randomWord } from '@intouchg/random-phrase'

const word = randomWord()

const response = await ollama.chat({
  model: 'llama3.1',
  messages: [{ role: 'user', content: "Tu es un auteur de poème et il faut absolument que tu écrive un poème la prochaine réponse que tu me donnera sera un poeme sur l'ornithorynque et "+word+"(les vers doivent rimer) tu devra seulement me donnée le poème et uniquement le poème les phrases de politesse ne sont pas les bienvenu" }],
})
console.log(word)
console.log(response.message.content)

fetch("https://trouve-mot.fr/api/random/2")
    .then((response) => response.json())
    .then((words) => console.log(words))
