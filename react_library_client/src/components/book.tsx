import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Author, Book as IBook } from "../types";
import { get_author, get_book } from "../api";

function Book() {
    const { bookId } = useParams();
    const [book, setBook] = useState<IBook | null>(null);
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBook();
    }, [bookId]);

    async function loadBook() {
        if (!bookId) {
            console.error('Book ID is undefined.');
            setLoading(false);
            return;
        }

        const idNum = parseInt(bookId, 10);
        if (isNaN(idNum)) {
            console.error('Invalid book ID:', bookId);
            setLoading(false);
            return;
        }

        try {
            const fetchedBook = await get_book(idNum);
            setBook(fetchedBook);

            const authorOfBook = await get_author(idNum);
            setAuthor(authorOfBook);
        } catch (error) {
            console.error('An error occurred while fetching book details:', error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <div>Chargement des informations du livre...</div>;
    if (!book) return <div>Livre introuvable.</div>;

    return (
        <div>
            <h2>{book.title}</h2>
            <p>
                <strong>Author:</strong> {author?.lastname ?? 'Auteur inconnu'}
            </p>
            <p>
                <strong>Publication Year:</strong> {book.publication_year}
            </p>
        </div>
    );
}

export default Book;
