import z from "zod";

export const getWeatherInputSchema = z.object({
    city: z.string().min(1),
    country: z.string()
});