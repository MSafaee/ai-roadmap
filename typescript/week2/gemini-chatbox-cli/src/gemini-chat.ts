import { GoogleGenAI } from "@google/genai";

export class GeminiChat {

    private readonly model : string;
    private readonly geminiChat : GoogleGenAI;
    private previouseId : string | undefined;

    public constructor (apiKey : string , apiModel : string) {
        this.model = apiModel;
        this.geminiChat = new GoogleGenAI({apiKey});
    }

    async *AskModel( userInput : string) {

        const response = await this.geminiChat.interactions.create (
            { 
                model: this.model, 
                input: userInput, 
                stream : true, 
                previous_interaction_id : this.previouseId
            }
        ); 

        for await (const event of response) {

            if (event.event_type === "step.delta" && event.delta.type === "text") {
               yield event.delta.text;
            }

            if (event.event_type === "error") {
                throw new Error ( event.error?.message );
            }

            if (event.event_type === "interaction.completed") {

                this.previouseId = event.interaction.id;
                
                const usage = event.interaction.usage;

                if (!usage) { throw new Error ( "unspected error in calculating token usage"); }

                console.log("\n");
                console.log(`Input tokens: ${usage.total_input_tokens}`);
                console.log(`Output tokens: ${usage.total_output_tokens}`);
                console.log(`Total tokens: ${usage.total_tokens}`);

            }
        }
    }
}