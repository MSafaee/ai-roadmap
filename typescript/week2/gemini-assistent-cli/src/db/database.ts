import pg from "pg";
import { arrayScheduleSchema, scheduleSchema } from "../types/type-schema.js"
import { TaskStatus, type Schedule } from "../types/type.js";

const { Pool } = pg;

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export async function insertSchedule(owner: number, task: string, attendees: number[], deadline: Date)
    : Promise<Schedule> {
    const result = await pool.query(
        `
        INSERT INTO schedules (owner, task, attendees, deadline)
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [owner, task, attendees, deadline]
    );

    return scheduleSchema.parse(result.rows[0]);
}

export async function deleteSchedule(user: number, id: number): Promise<boolean>{
    const result = await pool.query(
        `
        DELETE FROM schedules
        WHERE owner = $1 AND id = $2
        `,
        [user, id]
    );
    
    // if (result.rowCount === 0) throw new Error(`Couldn't find Task ${id} for user ${user}`);
    return true;
}

export async function updateAllTasks(): Promise<number> {

    const result = await pool.query(
        `
        UPDATE schedules
        SET delayed = TRUE
        WHERE delayed = FALSE AND status != $1 AND deadline < NOW()
        `,
        [TaskStatus.COMPLETED]
    );

    return result.rowCount ?? 0;
}

export async function finishTask(user: number, id: number): Promise<Schedule> {

    const result = await pool.query(
        `
        UPDATE schedules
        SET status = $1,
            finished_at = NOW(),
            delayed = NOW() > deadline
        WHERE owner = $2 AND id = $3
        RETURNING *
        `,
        [TaskStatus.COMPLETED, user, id]
    );

    // if (result.rows.length === 0) throw new Error(`Couldn't find Task ${id} for user ${user}`);
    return scheduleSchema.parse(result.rows[0]);
}

export async function getTasks(where: string, values: any[]): Promise<Schedule[]> {

    const result = await pool.query(
        `
        SELECT *
        FROM schedules
        ${where}
        ORDER BY deadline ASC
        `,
        values
    );

    return arrayScheduleSchema.parse(result.rows);
}