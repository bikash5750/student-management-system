import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
 apiKey: "AIzaSyArGrKLDkQ2fUpsDCf10l1oHrpYaOqggWw",
});

async function main(msg) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",   
    contents: msg,
  });

   return response.text;
}

export default main;
