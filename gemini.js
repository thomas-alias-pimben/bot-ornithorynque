import fs from 'fs'; 
import key from './API_KEY.json' assert { type: 'json' };



import { GoogleGenerativeAI } from "@google/generative-ai";

export async function platipuspoemer(word) {

    const genAI = new GoogleGenerativeAI(key.geminiAI);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    console.log(word);

    const prompt = "Tu es un poète et ta mission est d'écrire un poème. La prochaine réponse que tu donneras sera un poème sur l'ornithorynque et "+word+". Les vers doivent rimer, et le poème doit faire moins de 50 mots. Écris seulement le poème, sans introduction ni explication. Si tu fais autre chose qu’écrire le poème directement, tu échoues à ta mission. Si tu fais un poème de moins de 50 mots, tu échoues encore PLUS la mission.";


    const result = await model.generateContent([prompt]);
    return result.response.text();
}

