import { getEmbeddings } from "./gemini.js";
import { sentences } from "./sentences.js";
import { cosineSimilarity } from "./similarityCheck.js";

const embeddings : number[][] = [];
const similarityMatrix : number[][] = [];

try {

    for (const sentence of sentences) {
        const embedded = await getEmbeddings(sentence)
        embeddings.push (embedded);
        console.log (embedded.length)
    }

    for (const sentenceA of embeddings) {

        let similarityRow : number[] = [];

        for (const sentenceB of embeddings) {

            similarityRow.push (cosineSimilarity(sentenceA, sentenceB))

        }

        similarityMatrix.push(similarityRow);
        console.log(similarityRow.map(value => value.toFixed(6).padStart(10)).join(" "));
    }

} catch (error) {
    console.error (error instanceof Error ? error.message : "unknown error")
}