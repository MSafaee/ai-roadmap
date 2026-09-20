import { GoogleGenAI, type ContentEmbedding } from "@google/genai";

const model = "gemini-embedding-001";
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) { 
    console.error("Gemini api key not found.");
    process.exit(1);
}

const ai = new GoogleGenAI({apiKey});

export async function getEmbeddings( userInput : string) : Promise<number[]> {

    const response = await ai.models.embedContent ({ 
        model: model,   
        contents: userInput, 
        config: { taskType: 'SEMANTIC_SIMILARITY' }
    });

    const embedding = response.embeddings;

    if (embedding && embedding[0]?.values){
        return embedding[0]?.values;   
    }

    throw new Error ("No response was generated");
}