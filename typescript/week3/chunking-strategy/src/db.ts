import { Pool } from "pg";
import type { ChunkStrategy } from "./type.js";

export const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "chunking"
});

export async function CreateTable(dimension: number) {

    await pool.query(`
        CREATE TABLE IF NOT EXISTS chunks (
        id SERIAL PRIMARY KEY,
        strategy INTEGER NOT NULL,
        index INTEGER NOT NULL,
        content TEXT NOT NULL,
        embedding VECTOR(${dimension}) NOT NULL
        )`
    );
}

export async function DeleteTable() {

    await pool.query(`TRUNCATE TABLE chunks;`);
}

export async function InsertChunk (strategy: ChunkStrategy, index: number, content: string,
    embedding: number[]) {
    
    await pool.query(
        `INSERT INTO chunks (strategy, index, content, embedding) VALUES ($1, $2, $3, $4)`,
        [strategy, index, content, JSON.stringify(embedding)]
    );
}

export async function searchChunks(strategy: ChunkStrategy, embeddedQuery: number[]) {

    const result = await pool.query(`
        SELECT index, content, 1 - (embedding <=> $1::vector) AS similarity
        FROM chunks
        WHERE strategy = $2
        ORDER BY embedding <=> $1::vector
        LIMIT 5;
        `,
        [JSON.stringify(embeddedQuery), strategy]
    );

    return result.rows;
}