import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { add_author, get_authors, remove_author } from '../api';
import { Author, AuthorCreationData } from '../types';
import Pagination from "../utils/pagination.tsx";
import {goTo} from "../utils/globalFunctions.tsx";


function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
    const [currentPage, setCurrentPage] = useState(1); // State to store the current page number
    const [totalItems, setTotalItems] = useState(0); // State to store the total number of items
    const pageSize = 10; // Define your page size here
    const [filter, setFilter] = useState("");   // State to store the filter value

    useEffect(() => {
        loadAuthors();
    }, [currentPage, filter]); // When the currentPage or filter changes, reload the authors

    /*
        loadAuthors :
            Fetches the list of authors from the api and updates the state.
        Parameter(s) :
            - None
        Return :
            - None
    */
    async function loadAuthors() {
        setLoading(true);
        try {
            const { authors, totalCount } = await get_authors({ page: currentPage, pageSize, lastname : filter });
            setAuthors(authors);
            setTotalItems(totalCount); // Now also updates the total number of authors

            if (currentPage > 1 && totalCount < (currentPage - 1) * pageSize) {
                setCurrentPage(1); // Reset to the first page if the current page is empty
            }

        } catch (error) {
            console.error("Failed to fetch authors:", error);
            setErrorMessage("Failed to load authors. Please try again later.");
        }
        setLoading(false);
    }

    /*
        addAuthor :
            Adds an author to the api and reloads the list of authors.
        Parameter(s) :
            - authorCreationData: AuthorCreationData : An object containing data for creating the new author, including 'firstname' and 'lastname'.
        Return :
            - None
    */
    async function addAuthor(authorCreationData: AuthorCreationData) {
        try {
            await add_author(authorCreationData);
            loadAuthors(); // Reload the authors list to reflect the addition
        } catch (error) {
            console.error("Failed to add author:", error);
            setErrorMessage("Failed to add author. Please check your data and try again.");
        }
    }

    /*
        handleAdd :
            Processes the fields entered to add an author to the api.
        Parameter(s) :
            - event: React.FormEvent<HTMLFormElement> : The form submission event
        Return :
            - None
    */
    function handleAdd(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Don't use the default form submission behavior
        const form = event.currentTarget;
        const formData = new FormData(form);
        const authorCreationData: AuthorCreationData = {
            firstname: formData.get("firstname") as string,
            lastname: formData.get("lastname") as string,
        };
        addAuthor(authorCreationData);
        form.reset();
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
            await remove_author(authorId);
            loadAuthors(); // Reload the authors list to reflect the removal
            setErrorMessage(""); // Clear any existing errors on successful operation
            goTo('/authors');
        } catch (error) {
            console.error("Failed to remove author:", error);
            setErrorMessage("Failed to remove author. Please try again later.");
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
        setFilter(formData.get('lastnameFilter') as string);
    }

    return (
        <div id="container">
            <div id="sidebar">
                {errorMessage && <p className="error">{errorMessage}</p>}

                <form onSubmit={handleFilter}>
                    <input type="text" name="lastnameFilter" placeholder="Filter by Last Name" />
                    <button type="submit">Filter</button>
                </form>


                <form onSubmit={handleAdd}>
                    <input type="text" name="firstname" placeholder="First Name"/>
                    <input type="text" name="lastname" placeholder="Last Name"/>
                    <button type="submit">Add Author</button>
                </form>

                <Pagination
                    page={currentPage}
                    pageSize={pageSize}
                    total={totalItems}
                    onPageChange={setCurrentPage} // Pass the setCurrentPage function as a prop
                />

                <ul>
                    {authors.map((author) => (
                        <li key={author.id}>
                            <NavLink to={`/authors/${author.id}`}>
                                {author.firstname} {author.lastname}
                            </NavLink>
                            <button className="small danger" onClick={() => handleRemove(author.id)}>Supprimer</button>
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

export default Authors;
