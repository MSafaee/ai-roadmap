import fs from "node:fs";
import type { Model } from "./types.js";
import { TokenCounter } from "./tokenizer.js";
import type { TiktokenModel } from "tiktoken";
import { readFile } from "node:fs/promises";

const MODELS_COST_FILEPATH = "files/model.json";
const TEXT_FILEPATH = "files/sample.txt";

const models: Model[] = JSON.parse(fs.readFileSync(MODELS_COST_FILEPATH, "utf-8"));
const text = await readFile(TEXT_FILEPATH, "utf-8");


for (const model of models) {

    const length = TokenCounter(text, model.name as TiktokenModel);
    const cost = (length/1_000_000) * model.inputPM;

    console.log(`${model.name} : tokens = ${length}, cost = ${cost}`);
}
