// src/routes/author.tsx
import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {add_book, get_books_of_author, remove_book} from "../api.ts";
import {Book, BookCreationData} from "../types.ts";
// Import the necessary API functions for books here

const AuthorBooks = () => {
    const { authorId: authorIdString } = useParams<{ authorId?: string }>();
    const authorId = authorIdString ? parseInt(authorIdString, 10) : null;  // Parse the authorId to a number

    const [books, setBooks] = useState<Book[]>([]); // State for storing the books of the author
    const [loading, setLoading] = useState(true); // State for the loading indicator

    useEffect(() => {
        // Fetch the books when the component mounts or when authorId changes
        loadBooksOfAuthor();
    }, [authorId]);

    /*
    loadBooksOfAuthor :
        Fetches and sets the books written by the specified author.
    Parameter(s) :
        - None
    Return :
        - None
    */
    async function loadBooksOfAuthor() {
        setLoading(true);
        try {
            if (authorId === null) {
                throw new Error('Invalid author ID');
            }
            // If the authorId is valid, fetch the books of the author
            const authorBooks = await get_books_of_author(authorId);
            setBooks(authorBooks);
        } catch (error) {
            console.error('Failed to fetch books:', error);
        }
        setLoading(false);
    }


    /*
    addBook :
        Adds a new book to the author's book list and updates the view.
    Parameter(s) :
        - authorId : number : The ID of the author.
        - bookData : BookCreationData : The data of the new book to be added.
    Return :
        - None
    */
    async function addBook(authorId : number, bookData: BookCreationData) {
        await add_book(authorId, bookData);
        loadBooksOfAuthor();
    }

    /*
        handleAddBook :
            Handles the form submission event for adding a new book.
        Parameter(s) :
            - event : React.FormEvent<HTMLFormElement> : The form submission event.
        Return :
            - None
    */
    function handleAddBook(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        const title = formData.get('title') as string;
        const publication_year = formData.get('year') as string;

        let bookData : BookCreationData;
        if (publication_year) {
            bookData = {
                title: title,
                publication_year: parseInt(publication_year, 10),
            }
        }
        else{
            bookData = {
                title: title,
            };
        }

        // Call the addBook function with the bookData
        if (typeof authorId === "number") {
            addBook(authorId, bookData);
        }

    }

    /*
    removeBook :
        Removes a book from the author's book list and updates the view.
    Parameter(s) :
        - bookId : number : The ID of the book to be removed.
    Return :
        - None
    */
    async function removeBook(bookId: number) {
        try {
            await remove_book(bookId);
            loadBooksOfAuthor();
        }
        catch (error) {
            console.error('Failed to remove book:', error);
        }

    }

    /*
        handleDeleteBook :
            Processes the request to delete a book.
        Parameter(s) :
            - bookId : number : The ID of the book to delete.
        Return :
            - None
    */
    function handleDeleteBook(bookId: number){
        removeBook(bookId);
    }


    return (
        <div>
            <h2>Add a book</h2>
            <form onSubmit={handleAddBook}>
                <input type="text" name="title" placeholder="Title"/>
                <input type="text" name="year" placeholder="Publication Year"/>
                <button type="submit">Add Book</button>
            </form>

            <h2>Author's books</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} ({book.publication_year})
                        <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {
                loading && <div>Loading books...</div>
            }
        </div>
    );
};

export default AuthorBooks;
