import { GoogleGenAI, type Interactions } from "@google/genai";
import { tools } from "../tools/tool.js";
import { executeTool } from "../executor.js";
import { prompt } from "./prompt.js";

const model = "gemini-3.8-flash";
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("Gemini api key not found.");
    process.exit(1);
}

const geminiChat = new GoogleGenAI({ apiKey });

let functionResults: Interactions.FunctionResultStep[];
let ask: number = 0;

export async function askModel(userInput: string, interactionID?: string): Promise<string> {

    console.log("k");
    ask++;
    if (ask > 2) return "exceed limit";

    const interaction = await geminiChat.interactions.create({
        model: model,
        input: userInput,
        previous_interaction_id: interactionID,
        tools: tools,
        system_instruction: prompt
    });

    const answer = interaction.output_text;
    
    if (answer) return answer;

    functionResults = [];
    for (const step of interaction.steps) {
        if (step.type === "function_call") {
            // test
            console.log(step.name);
            await callFunction(step.name, step.id, step.arguments);
        }
    }
   
    if (functionResults.length === 0) throw new Error(`No respond generated`);
    return await askModel(JSON.stringify(functionResults), interaction.id);
}

async function response(interactionID: string): Promise<string> {

    const response = await geminiChat.interactions.create({
        model: model,
        previous_interaction_id: interactionID,
        input: functionResults,
        tools: tools,
    });

    const answer = response.output_text;

    if (!answer) throw new Error(`No respond generated`);
    return answer;
}

async function callFunction(name: string, id: string, args: unknown) {

    let response;
    try {
        response = {
            success: true,
            data: await executeTool(name, args)
        }
    } catch (error) {
        response = {
            success: false,
            error: error instanceof Error ? error.message : "unknown error accured"
        }
    }
    // test
    console.log(JSON.stringify(response));
    functionResults.push(
        {
            type: "function_result",
            name: name,
            call_id: id,
            result: [{ type: "text", text: response }]
        }
    );
}