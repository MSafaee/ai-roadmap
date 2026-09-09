export const getWeatherFunction = {
    type: "function",
    name: "getWeather",
    description: "Get the current weather of a city",
    parameters: {
        type: "object",
        properties: {
            city: {
                type: "string",
                description: "The name of the city"
            },
            country: {
                type: "string",
                description: "The country where the city is located"
            }
        },
        required: ["city"]
    }
} as const;