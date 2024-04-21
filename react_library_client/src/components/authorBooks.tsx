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


    async function addBook(authorId : number, bookData: BookCreationData) {
        await add_book(authorId, bookData);
        loadBooksOfAuthor();
    }

    /*
        handleAddBook :
            Retrieves field values for the book from the form and calls the addBook function.
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
            Calls the removeBook function with the bookId to delete the book.
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
            <h2>Ajouter un livre</h2>
            <form onSubmit={handleAddBook}>
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="year" placeholder="Publication Year" />
                <button type="submit">Add Book</button>
            </form>

            <h2>Livre(s) de l'auteur</h2>
            {
                loading && <div>Loading books...</div>
            }
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} ({book.publication_year})
                        <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthorBooks;
