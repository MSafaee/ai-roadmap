import { createChat } from "./cli.js";
import { GeminiChat } from "./gemini-chat.js";

const apiKey = process.env.GEMINI_API_KEY;
const apiModel = "gemini-3.6-flash";

if (apiKey) { 
    createChat (new GeminiChat ( apiKey, apiModel ));
}
else {
    console.log("Gemini api key not found."); 
}