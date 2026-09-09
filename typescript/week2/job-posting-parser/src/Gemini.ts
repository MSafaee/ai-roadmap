import { GoogleGenAI } from "@google/genai";
import { JobSchema } from "./schema.js";
import z from "zod";
import { tr } from "zod/locales";

const model = "gemini-3.6-flash";
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) { 
    console.error("Gemini api key not found.");
    process.exit(1);
}

const geminiChat = new GoogleGenAI({apiKey});

export async function extract( userInput : string) : Promise<string> {

    const response = await geminiChat.interactions.create ({ 
        model: model,   
        input: userInput, 
        system_instruction : "Extract structed information from the given job advertismenent",
        response_format: {                    
            type : "text",
            mime_type : "application/json",
            schema : z.toJSONSchema(JobSchema)
        }
    }); 

    if (response.output_text) {
        return response.output_text;        
    }

    throw new Error ("No response was generated");
}