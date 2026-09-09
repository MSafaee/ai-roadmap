import { JobSchema } from "./schema.js";
import { readFile } from "node:fs/promises";
import { extract } from "./Gemini.js";

const FILE_ADRESS = "src/advertisement.txt";

try {

    const userInput = await readFile(FILE_ADRESS, 'utf-8');

    let response = await extract(userInput);

    if ( !validate (response) ) {

        console.log("Retry Extracting...");
        response = await extract(userInput);
    }
    console.log("Gemini: " + response);
    
} catch (error) {
    PrintError (error)
}

function validate( response : string ) : boolean{

    try {

        JobSchema.parse(JSON.parse(response));
        return true;

    } catch (error) {
        PrintError (error);
        return false;
    }
}

function PrintError ( error : unknown ) {
    if (error instanceof Error) {
        console.error ( "Error : " + error.message );
    }
    else console.error ( "Unknown error accured" );
}

