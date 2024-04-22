import {NavLink, useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import { Author, Book as IBook } from "../types";
import {get_author, get_book, update_book} from "../api";
import BookTags from "./bookTags.tsx";
import EditableText from "./editableText.tsx";
import {refreshWindow} from "../utils/globalFunctions.tsx";

function Book() {
    const { bookId } = useParams();
    const [book, setBook] = useState<IBook>({id: -1, title: '', authorId: -1, tags: []});
    const [author, setAuthor] = useState<Author | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadBook();
    }, [bookId]);


    /*
    loadBook :
        Loads the book's details by its ID and fetches the author's details associated with the book.
    Parameter(s) :
        - None
    Return :
        - None
    */
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
            const fetchedBook : IBook = await get_book(idNum);
            setBook(fetchedBook);

            const authorOfBookId = fetchedBook.authorId;
            //console.log('Author ID:', authorOfBookId);
            const authorOfBook : Author = await get_author(authorOfBookId);
            setAuthor(authorOfBook);
        } catch (error) {
            console.error('An error occurred while fetching book details:', error);
        } finally {
            setLoading(false);
        }
    }


    /*
    updateTitle :
        Updates the title of the book and refreshes the view.
    Parameter(s) :
        - newTitle : string : The new title to update the book with.
    Return :
        - None
    */
    async function updateTitle(newTitle: string) {
        await update_book(book.id, {title: newTitle});
        refreshWindow();
    }

    /*
    updatePublicationYear :
        Updates the publication year of the book and refreshes the view.
    Parameter(s) :
        - newPublicationYear : string : The new publication year to update the book with.
    Return :
        - None
    */
    async function updatePublicationYear(newPublicationYear: string) {
        await update_book(book.id, {publication_year: parseInt(newPublicationYear)});
        refreshWindow();
    }

    if (loading) return <div>Chargement des informations du livre...</div>;
    if (book.id === -1) return <div>Livre introuvable.</div>;

    return (
        <div>

            <h2>
                <EditableText value={book.title} onUpdate={updateTitle}/>
            </h2>
            <p>
                <strong>Author:</strong>
                <NavLink to={"/authors/" + author?.id}>
                    {author ? `${author.firstname} ${author.lastname}` : 'Auteur inconnu'}
                </NavLink>
            </p>
            <p className="row">Published : &nbsp;
                <EditableText
                    value={book.publication_year != null ? book.publication_year.toString() : ''}
                    onUpdate={updatePublicationYear}
                />
            </p>

            <BookTags/>
        </div>
    );
}

export default Book;
