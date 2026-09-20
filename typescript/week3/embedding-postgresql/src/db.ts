import { Pool } from "pg";

export const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "vectors"
});

export async function CreateTable(dimension: number) {

    await pool.query(`CREATE TABLE IF NOT EXISTS sentences (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    embedding VECTOR(${dimension}) NOT NULL
    )`);
}

export async function DeleteTable() {

    await pool.query(`DROP TABLE IF EXISTS sentences`);
}

export async function InsertVector (sentence: string, embedding: number[]) {
    
    await pool.query(
        `INSERT INTO sentences (text, embedding) VALUES ($1, $2)`,
        [sentence, JSON.stringify(embedding)]
    );
}

export async function NearestNeighbor(): Promise<any[]> {

    const result = await pool.query(`
        SELECT a.id AS id_a, b.id AS id_b, a.embedding <=> b.embedding AS distance
        FROM sentences a
        CROSS JOIN sentences b
        ORDER BY a.id, b.id;
    `);

    return result.rows;
}



