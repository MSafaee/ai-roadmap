import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { askModel } from "./ai/gemini.js";

const rl = createInterface({ input, output });

console.log("Gemini Chatbox");
console.log("Type 'exit' to quit.");

while (true) {

    const userInput = await rl.question("You: ");

    if (userInput.trim().toLowerCase() === "exit") break;

    if (userInput.length === 0) continue;

    try {

        console.log("Gemini: ");
        console.log(await askModel(userInput));

    } catch (error) {
        console.error(error);
    }
}

rl.close();
console.log("chat closed");