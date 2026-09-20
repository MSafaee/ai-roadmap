import { CreateTable, DeleteTable, InsertChunk, searchChunks } from "./db.js";
import { getEmbedding } from "./gemini.js";
import { SplitText } from "./chunker.js";
import { ChunkStrategy } from "./type.js";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { readFile } from "node:fs/promises";

const rl = createInterface({ input, output });

const userInput = await rl.question("You: ");

try {

    const FILE_ADRESS = "data/document.md";
    const text = await readFile(FILE_ADRESS, 'utf-8');

    await DeleteTable();

    const embeddedQuery = await getEmbedding(userInput);

    EmbedChunks(ChunkStrategy.FixedSize, text);
    query(ChunkStrategy.FixedSize, embeddedQuery);

    EmbedChunks(ChunkStrategy.Overlap, text);
    query(ChunkStrategy.Overlap, embeddedQuery);

    EmbedChunks(ChunkStrategy.Markdown, text);
    query(ChunkStrategy.Markdown, embeddedQuery);

} catch (error) {
    console.error(error instanceof Error ? error.message : "unknown error");
}


async function EmbedChunks(strategy: ChunkStrategy, text: string) {
    
    const chunks = await SplitText(strategy, text);

    console.log(`strategy: ${strategy} -> chunks: ${chunks.length}`);

    for (let i = 0; i < chunks.length; i++) {

        const chunk = chunks[i];
        
        if (chunk === undefined) continue;

        const embedding = await getEmbedding(chunk);

        await InsertChunk(strategy, i, chunk, embedding);

        await new Promise(resolve => setTimeout(resolve, 100));
    }
}


async function query (strategy: ChunkStrategy, embeddedQuery: number[]) {

    const results = await searchChunks(strategy, embeddedQuery);

    results.forEach((result, index) => {

        console.log(`Result ${index + 1}: ${result.content}`);

        console.log(`Similarity: ${Number(result.similarity).toFixed(4)}`);
    });
}
