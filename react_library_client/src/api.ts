import {AuthorCreationData, AuthorUpdateData, BookCreationData} from "./types.ts";

const apiBasename = "http://localhost:3000";

interface GetAuthorsParams {
    page?: number;      // Number of the page to fetch
    pageSize?: number;  // Number of items per page
    lastname?: string; // Lastname of the author to search for
}

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

export async function update_author(authorId: number, authorUpdateData: AuthorUpdateData) {
    const res = await fetch(`${apiBasename}/authors/${authorId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authorUpdateData),
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}


// -------------------------------------------- BOOKS --------------------------------------------
interface GetBooksParams {
    page?: number;      // Number of the page to fetch
    pageSize?: number;  // Number of items per page
    title?: string; // Title of the book to search for
}
export async function get_books({ page, pageSize, title }: GetBooksParams) {
    // Calculating skip and take values
    const skip = page && pageSize ? (page - 1) * pageSize : undefined;
    const take = pageSize;

    // Construct the query string
    let queryString = '';
    if (skip !== undefined && take !== undefined) {
        queryString = `?skip=${skip}&take=${take}`;
    }

    // Add the title parameter to the query string if it is provided
    if (title) {
        queryString += `${queryString ? '&' : '?'}title=${encodeURIComponent(title)}`;
    }

    const res = await fetch(`${apiBasename}/books${queryString}`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const books = await res.json();
    // Retrieve the total count of books from the response headers
    const totalCount = parseInt(res.headers.get('X-Total-Count') || '0', 10);

    return {
        books,
        totalCount
    };
}

export async function update_book(bookId: number, bookData: BookCreationData) {
    const res = await fetch(`${apiBasename}/books/${bookId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}


export async function get_books_of_author(authorId: number) {
    const res = await fetch(`${apiBasename}/authors/${authorId}/books`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const books = await res.json();
    return books;
}

export async function get_book(bookId: number) {
    const res = await fetch(`${apiBasename}/books/${bookId}`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const book = await res.json();
    return book;

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

// -------------------------------------------- TAGS --------------------------------------------

export async function get_all_tags() {
    const res = await fetch(`${apiBasename}/tags`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const tags = await res.json();
    return tags;
}

export async function get_tags(bookId: number) {
    const res = await fetch(`${apiBasename}/books/${bookId}/tags`);
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
    const tags = await res.json();
    return tags;
}

export async function remove_tag_on_book(bookId: number, tagId: number) {
    const res = await fetch(`${apiBasename}/books/${bookId}/tags/${tagId}`, {
        method: "DELETE"
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}

export async function add_tag_on_book(bookId: number, tagId: number) {
    const res = await fetch(`${apiBasename}/books/${bookId}/tags/${tagId}`, {
        method: "POST",
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
    }
}
