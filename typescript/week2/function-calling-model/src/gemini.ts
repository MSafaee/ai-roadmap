import { GoogleGenAI, type Interactions} from "@google/genai";
import { getWeatherFunction } from "./tool.js";
import { getWeather } from "./Weather.js";
import { executeFunction } from "./executor.js";

const model = "gemini-3.8-flash";
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("Gemini api key not found.");
    process.exit(1);
}

const geminiChat = new GoogleGenAI({ apiKey });

export async function askModel (userInput: string): Promise<string> {

    const interaction = await geminiChat.interactions.create({
        model: model,
        input: userInput,
        tools: [getWeatherFunction],
        generation_config: { thinking_summaries: "auto" }
    });

    if (interaction.output_text) return interaction.output_text;

    const functionResults: Interactions.FunctionResultStep[] = [];
    
    for (const step of interaction.steps) {
        if (step.type === "function_call") {
            const result = await executeFunction(step.name, step.arguments);
            functionResults.push(getResult(step.name, step.id, result));
        }
    }

    return await response(functionResults, interaction.id);
}

async function response(results: Interactions.FunctionResultStep[], interactionID: string): Promise<string> {
    
    const response = await geminiChat.interactions.create({
        model: model,
        previous_interaction_id: interactionID,
        input: results,
        tools: [getWeatherFunction],
        generation_config: { thinking_summaries: "auto" }
    });

    const answer = response.output_text;

    if (!answer) throw new Error(`No respond generated`);
    return answer;
}

function getResult(name: string, id: string, result: string): Interactions.FunctionResultStep {
    return {
        type: "function_result",
        name: name,
        call_id: id,
        result: [ { type: "text", text: result } ]
    };
}

