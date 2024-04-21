import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import {get_author} from "../api.ts";
import {Author as IAuthor} from "../types.ts";

function Author() {
    const { authorId } = useParams();
    const [author, setAuthor] = useState<IAuthor>();

    useEffect(() => {
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
        loadAuthor();
    }, [authorId]); // Re-run this effect whenever the `authorId` changes

    if (!author) return <div>Chargement de l'auteur...</div>;

    return (
        <div>{author.lastname} {}</div>
    );
}

export default Author;
