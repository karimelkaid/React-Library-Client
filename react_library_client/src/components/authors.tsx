import {add_author, get_authors, remove_author} from "../api";
import {Author, AuthorCreationData} from "../types";
import {NavLink, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";

function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");  // State to store error messages

    useEffect(() => {
        loadAuthors();
    }, []);

    /*
        loadAuthors :
            Loads the authors from the api and sets the state accordingly.
        Parameter(s) :
            - None
        Return :
            void
     */
    async function loadAuthors() {
        setLoading(true);
        try {
            const authorsData = await get_authors();
            console.log("Authors:", authorsData);
            setAuthors(authorsData);
        } catch (error) {
            console.error("Failed to fetch authors:", error);
        }
        setLoading(false);
    }

    /*
        addAuthor :
            Adds an author to the api and reloads the list of authors.
        Parameter(s) :
            - authorCreationData : AuthorCreationData : The data of the author to add.
        Return :
            void
    */
    async function addAuthor(authorCreationData: AuthorCreationData) {
        try{
            await add_author(authorCreationData)
            loadAuthors();
        }
        catch(error){
            console.error("Failed to add author:", error);
            setErrorMessage("Failed to add author. Please check your data and try again.");
        }
    }

    /*
        handleAdd :
            Processes the fields entered to add an author to the api.
        Parameter(s) :
            - event : React.FormEvent<HTMLFormElement> : The event that triggered the function.
        Return :
            void
    */
    function handleAdd(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Don't use the default form submission behavior
        const form = event.currentTarget;
        const formData = new FormData(form);
        //console.log("firstname", formData.get("firstname"));
        const authorCreationData : AuthorCreationData = {
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
            - authorId : number : The id of the author to remove.
        Return :
            void
    */
    async function handleRemove(authorId: number) {
        try {
            await remove_author(authorId);
            loadAuthors();
            setErrorMessage("");  // Clear any existing errors on successful operation
        } catch (error) {
            console.error("Failed to remove author:", error);
            setErrorMessage("Failed to remove author. Please try again later.");
        }
    }

    return (
        <div id="container">
            <div id="sidebar">
                {errorMessage && <p className="error">{errorMessage}</p>}
                <form onSubmit={handleAdd}>
                    <input
                        type="text"
                        name="firstname"/>
                    <input
                        type="text"
                        name="lastname"
                    />
                    <button type="submit">Add Author</button>
                </form>

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
                <Outlet/>
            </div>
        </div>
    );
}

export default Authors;
