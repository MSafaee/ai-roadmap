import { CreateTable, DeleteTable, InsertVector, NearestNeighbor } from "./db.js";
import { getEmbeddings } from "./gemini.js";
import { sentences } from "./sample-sentences.js";

try {

    await DeleteTable();

    for (const sentence of sentences) {

        const embedded = await getEmbeddings(sentence);

        if (sentences.indexOf(sentence) == 0) {
            await CreateTable(embedded.length)
        }
        
        await InsertVector(sentence, embedded);
    }

    const result = await NearestNeighbor();

    console.log(result);
    console.log(result.length);

} catch (error) {
    console.error(error instanceof Error ? error.message : "unknown error");
}