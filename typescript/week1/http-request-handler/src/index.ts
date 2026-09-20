import { getPost } from "./RequestHandler.js";

try {
    const posts = await Promise.all([getPost(1), getPost(2), getPost(3), getPost(4), getPost(5)]);

    console.log (posts);
    
} catch (Error) {console.log (Error)}
