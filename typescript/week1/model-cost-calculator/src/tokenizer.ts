import { encoding_for_model, get_encoding, type TiktokenModel } from "tiktoken";

export function TokenCounter(text: string, model: TiktokenModel): number {

    let encoding;

    try {
    encoding = encoding_for_model(model);
    } catch {
    encoding = get_encoding("o200k_base");
    }

    const tokenized = encoding.encode(text);
    encoding.free();
    
    return tokenized.length;
}