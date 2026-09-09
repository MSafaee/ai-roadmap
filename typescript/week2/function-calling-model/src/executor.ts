import { getWeatherInputSchema } from "./type.js";
import { getWeather } from "./Weather.js";

export async function executeFunction(name: string, args: unknown): Promise<string> {

    try {
        switch (name) {
            case "getWeather": {
                const input = getWeatherInputSchema.parse(args);
                return getWeather(input.city, input.country);
            }
            default: throw new Error(`failed to find function: ${name}`);
        }
    } catch (error) {
        return error instanceof Error ? error.message
            : "unknown error accured while executing function: ${name}"
    }
}