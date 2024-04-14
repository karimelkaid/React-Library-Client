import React, { useEffect, useState } from "react";
import { get_authors } from "../api";
import { Author } from "../types";
import { Outlet } from "react-router-dom";

function Authors() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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

        loadAuthors();
    }, []);

    if (loading) {
        return <div>Chargement...</div>;
    }

    return (
        <div id="container">
            <div id="sidebar">
                <ul>
                    {authors.map((author) => (
                        <li key={author.id}>
                            {author.firstname} {author.lastname}
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
