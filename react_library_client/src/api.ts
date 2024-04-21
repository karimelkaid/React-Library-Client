import {AuthorCreationData, BookCreationData} from "./types.ts";

const apiBasename = "http://192.168.1.9:3000";

interface GetAuthorsParams {
    page?: number;      // Number of the page to fetch
    pageSize?: number;  // Number of items per page
    lastname?: string; // Lastname of the author to search for
}

/*
    get_authors :
        Fetches the list of authors from the api.
    Parameter(s) :
        - None
    Return :
        - Returns an array of author objects if the request is successful.
        - Throws an error with a relevant message if the request fails.
*/

export async function get_authors({ page, pageSize, lastname }: GetAuthorsParams) {
    // Calculating skip and take values
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize;

    // Construct the query string
    let queryString = '';
    if (skip !== undefined && take !== undefined) {
        queryString = `?skip=${skip}&take=${take}`;
    }

    // Add the lastname parameter to the query string if it is provided
    if (lastname) {
        queryString += `${queryString ? '&' : '?'}lastname=${encodeURIComponent(lastname)}`;
    }


    const res = await fetch(`${apiBasename}/authors${queryString}`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }

    const authors = await res.json();
    // Retrieve the total count of authors from the response headers
    const totalCount = parseInt(res.headers.get('X-Total-Count') || '0', 10);

    // Return the authors and the total count
    return {
        authors,
        totalCount
    };

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


// -------------------------------------------- BOOKS --------------------------------------------

export async function get_books_of_author(authorId: number) {
    const res = await fetch(`${apiBasename}/authors/${authorId}/books`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const books = await res.json();
    return books;
}

export async function add_book(authorId : number, bookData : BookCreationData) {
    const res = await fetch(`${apiBasename}/authors/` + authorId + `/books`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const book = await res.json();
    return book;
}

export async function remove_book(bookId: number) {
    const res = await fetch(`${apiBasename}/books/${bookId}`, {
        method: "DELETE"
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}
