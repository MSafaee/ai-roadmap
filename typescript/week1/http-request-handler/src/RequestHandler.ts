interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export async function getPost(id: number): Promise<Post> {

    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Request failed");
    }

    return await response.json() as Post;
}