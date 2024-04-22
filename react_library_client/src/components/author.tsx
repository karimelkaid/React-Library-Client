import { useParams } from 'react-router-dom';
import {get_author, update_author} from "../api.ts";
import {Author as IAuthor} from "../types.ts";
import AuthorBooks from "./authorBooks.tsx";
import EditableText from "./editableText.tsx";
import {useEffect, useState} from "react";

function Author() {
    const { authorId } = useParams();
    const [author, setAuthor] = useState<IAuthor>({id: -1, firstname: '', lastname: ''});

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
    }


    if (!author) return <div>Chargement de l'auteur...</div>;

    return (
        <div>
            <p>First name : <EditableText value={author.firstname} onUpdate={(newFirstname) => update_author(author.id, {firstname: newFirstname})} reloadMethod={loadAuthor()}/> </p>
            <p> Last name : <EditableText value={author.lastname} onUpdate={(newLastname) => update_author(author.id, {lastname: newLastname})}/> </p>
            <AuthorBooks />
        </div>
    );
}

export default Author;
