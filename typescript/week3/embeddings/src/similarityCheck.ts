export function cosineSimilarity (v1: number[], v2: number[]) : number {

    if (v1.length !== v2.length) {
        throw new Error("Vectors must have the same length");
    }

    let dot = 0;
    let normV1Squared = 0;
    let normV2Squared = 0;

    for (let i = 0; i < v1.length; i++) {

        dot +=  v1[i]! * v2[i]!;
        normV1Squared += v1[i]! ** 2;
        normV2Squared += v2[i]! ** 2;
    }

    
    const normV1 = Math.sqrt(normV1Squared);
    const normV2 = Math.sqrt(normV2Squared)
    
    return dot /  normV1 * normV2;

}