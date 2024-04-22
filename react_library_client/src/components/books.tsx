import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Pagination from "../utils/pagination.tsx";
import {Book} from "../types.ts";
import {get_books, remove_book} from "../api.ts";
import {goTo} from "../utils/globalFunctions.tsx";


function Books() {
    const [books, setAuthors] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
    const [currentPage, setCurrentPage] = useState(1); // State to store the current page number
    const [totalItems, setTotalItems] = useState(0); // State to store the total number of items
    const pageSize = 10; // Define your page size here
    const [filter, setFilter] = useState("");   // State to store the filter value

    useEffect(() => {
        loadBooks();
    }, [currentPage, filter]); // When the currentPage or filter changes, reload the authors

    /*
        loadAuthors :
            Fetches the list of authors from the api and updates the state.
        Parameter(s) :
            - None
        Return :
            - None
    */
    async function loadBooks() {
        setLoading(true);
        try {
            const { books, totalCount } = await get_books({ page: currentPage, pageSize, title : filter });
            setAuthors(books);
            setTotalItems(totalCount); // Now also updates the total number of authors

            if (currentPage > 1 && totalCount < (currentPage - 1) * pageSize) {
                setCurrentPage(1); // Reset to the first page if the current page is empty
            }

        } catch (error) {
            console.error("Failed to fetch books:", error);
            setErrorMessage("Failed to load books. Please try again later.");
        }
        setLoading(false);
    }

    if (loading) {
        return <div>Chargement...</div>;
    }

    /*
        handleRemove :
            Removes an author from the api and reloads the list of authors.
        Parameter(s) :
            - authorId: number : The ID of the author to remove
        Return :
            - None
    */
    async function handleRemove(authorId: number) {
        try {
            await remove_book(authorId);
            loadBooks(); // Reload the authors list to reflect the removal
            setErrorMessage(""); // Clear any existing errors on successful operation
            goTo('/books');


        } catch (error) {
            console.error("Failed to remove book:", error);
            setErrorMessage("Failed to remove book. Please try again later.");
        }
    }

    /*
        handleFilter :
            Processes the filter entered to filter the list of authors by last name and reloads the list of authors because of the filter.
        Parameter(s) :
            - event: React.FormEvent<HTMLFormElement> : The form submission event
        Return :
            - None
     */
    function handleFilter(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        setFilter(formData.get('titleFilter') as string);
    }

    return (
        <div id="container">
            <div id="sidebar">
                {errorMessage && <p className="error">{errorMessage}</p>}

                <form onSubmit={handleFilter}>
                    <input type="text" name="titleFilter" placeholder="Filter by title" />
                    <button type="submit">Filter</button>
                </form>

                <Pagination
                    page={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onPageChange={setCurrentPage} // Pass the setCurrentPage function as a prop
                />

                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <NavLink to={`/books/${book.id}`}>
                                {book.title}
                            </NavLink>
                            <button className="small danger" onClick={() => handleRemove(book.id)}>Supprimer</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="info">
                <Outlet />
            </div>
        </div>
    );
}

export default Books;
