import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { GeminiChat } from "./gemini-chat.js";

const rl = createInterface({input, output});

export async function createChat ( chat : GeminiChat) {

    console.log("Gemini Chatbox");
    console.log("Type 'exit' to quit.");

    while (true) {

        const userInput = await rl.question("You: ");

        if (userInput.trim().toLowerCase() === "exit") break;

        if (userInput.length === 0)  continue;

        try {

            console.log("Gemini: ");

            for await ( const chunk of chat.AskModel(userInput)) {
                process.stdout.write(chunk);
            }

        } catch (error) {
            console.log( "Error:", error );
        }
    }

    rl.close();
    console.log("chat closed");
}