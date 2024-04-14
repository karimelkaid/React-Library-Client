export type Author = {
    id: number,
    firstname: string,
    lastname: string,
    books?: Book[],
}

export type AuthorCreationData = {
    firstname: string,
    lastname: string,
}

export type Book = {
    id: number,
    title: string,
    publication_year: number,
    authorId: number,
    tags: Tag[];
    rating: number;
}

export type BookCreationData = {
    title?: string,
    publication_year?: number,
    rating?: number,
}

export type Tag = {
    id: number,
    name: string,
    books?: Book[];
}
