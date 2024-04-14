import {useEffect, useState} from "react";
import {get_authors} from "../api.ts";
import {Author} from "../types.ts";

function Authors(){
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        loadAuthors();
    }, []);


    const loadAuthors = async () => {
        setLoading(true);

        const authors = await get_authors();
        console.log(authors);
        setAuthors(authors);

        setLoading(false);
    };




    return (
        <div>
            <h1>Page des auteurs</h1>
        </div>
    )
}

export default Authors;
