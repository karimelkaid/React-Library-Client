import {AuthorCreationData} from "./types.ts";

const apiBasename = "http://192.168.1.9:3000";

/*
    get_authors :
        Fetches the list of authors from the api.
    Parameter(s) :
        - None
    Return :
        - Returns an array of author objects if the request is successful.
        - Throws an error with a relevant message if the request fails.
*/

export async function get_authors() {
    const res = await fetch(`${apiBasename}/authors`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const authors = await res.json();
    return authors;
}

/*
    add_author :
        Sends a POST request to the api to add a new author.
    Parameter(s) :
        - authorCreationData: AuthorCreationData : An object containing data for creating the new author, including 'firstname' and 'lastname'.
    Return :
        - Returns the newly created author object if the request is successful.
        - Throws an error with a relevant message if the request fails.
*/

export async function add_author(authorCreationData : AuthorCreationData) {
    const res = await fetch(`${apiBasename}/authors`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authorCreationData),
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const author = await res.json();
    return author;
}

export async function get_author(authorId: number) {
    const res = await fetch(`${apiBasename}/authors/${authorId}`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const author = await res.json();
    return author;
}

export async function remove_author(authorId: number) {
    const res = await fetch(`${apiBasename}/authors/${authorId}`, {
        method: "DELETE"
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}
