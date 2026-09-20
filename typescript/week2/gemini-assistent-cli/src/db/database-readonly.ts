import { Pool } from "pg";
import { arrayScheduleSchema } from "../types/type-schema.js";
import type { Schedule } from "../types/type.js";

export const readPool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_READ_USER,
    password: process.env.DB_READ_PASSWORD
});

export async function executeReadOnlyQuery(query: string): Promise<Schedule[]> {
    const result = await readPool.query(query);
    return arrayScheduleSchema.parse(result.rows);;
}