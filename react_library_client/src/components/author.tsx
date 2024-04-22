import { useParams } from 'react-router-dom';
import {get_author, update_author} from "../api.ts";
import {Author as IAuthor} from "../types.ts";
import AuthorBooks from "./authorBooks.tsx";
import EditableText from "./editableText.tsx";
import {useEffect, useState} from "react";
import { refreshWindow} from "../utils/globalFunctions.tsx";


function Author() {
    const { authorId } = useParams();
    const [author, setAuthor] = useState<IAuthor>({id: -1, firstname: '', lastname: ''});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAuthor();
    }, [authorId]); // Re-run this effect whenever the `authorId` changes

    async function loadAuthor() {
        if (authorId) {
            // Convert the author ID to a number
            const idNum = parseInt(authorId, 10);
            // Check if the conversion was successful
            if (!isNaN(idNum)) {
                const fetchedAuthor = await get_author(idNum);
                setAuthor(fetchedAuthor);
            } else {
                // Log an error if the conversion failed
                console.error('Invalid author ID:', authorId);
            }

        }
        setLoading(false);
    }

    /*
        updateFirstname :
            Updates the author's first name and refreshes the view.
        Parameter(s) :
            - newFirstname : string : The new first name of the author
        Return :
            - None
     */
    async function updateFirstname(newFirstname: string) {
        await update_author(author.id, {firstname: newFirstname});
        refreshWindow();
    }

    /*
        updateLastname :
            Updates the author's last name and refreshes the view.
        Parameter(s) :
            - newLastname : string : The new last name of the author
        Return :
            - None
     */
    async function updateLastname(newLastname: string) {
        await update_author(author.id, {lastname: newLastname});
        refreshWindow()
    }


    if (loading) {
        return <p>Loading author...</p>;
    }

    return (
        <div>
            <p>
                First name :
                <EditableText value={author.firstname} onUpdate={updateFirstname}/>
            </p>
            <p> Last name : <EditableText value={author.lastname} onUpdate={updateLastname}/> </p>
            <AuthorBooks />
        </div>
    );
}

export default Author;
