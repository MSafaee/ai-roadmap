import { RecursiveCharacterTextSplitter, MarkdownTextSplitter, TextSplitter } from "@langchain/textsplitters";
import { readFile } from "fs/promises";
import { ChunkStrategy } from "./type.js";

export async function SplitText(chunkType: ChunkStrategy, text: string): Promise<string[]> {

    const splitter = CreateTextSplitter(chunkType);
    const chunks = await splitter.splitText(text);

    if (!chunks) throw new Error("failed to split the text");

    return chunks;
}

function CreateTextSplitter (chunkType: ChunkStrategy): TextSplitter {

    switch (chunkType) {

        case ChunkStrategy.FixedSize: {
            return new RecursiveCharacterTextSplitter({ chunkSize: 250, chunkOverlap: 0 });
        }
            
        case ChunkStrategy.Overlap: {
            return new RecursiveCharacterTextSplitter({ chunkSize: 250, chunkOverlap: 50 });
        }
            
        case ChunkStrategy.Markdown: {
            return new MarkdownTextSplitter({ chunkSize: 500, chunkOverlap: 0 });
        }
    }
}

