import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {
    add_tag_on_book,
    get_all_tags,
    get_tags,
    remove_tag_on_book
} from "../api.ts";
import {Tag} from "../types.ts";

const BookTags = () => {
    const { bookId: bookIdString } = useParams<{ bookId?: string }>();
    const bookId = bookIdString ? parseInt(bookIdString, 10) : -1;  // Parse the bookId to a number

    const [tags, setTags] = useState<Tag[]>([]); // State for storing the tags of the author
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // State for the loading indicator

    useEffect(() => {
        // Fetch the tags when the component mounts or when bookId changes
        loadTagsOfBook();
        loadAllTags();
    }, [bookId]);

    /*
        loadTagsOfBook :
            Fetches and sets the tags associated with a book.
        Parameter(s) :
            - None
        Return :
            - None
    */
    async function loadTagsOfBook() {
        setLoading(true);
        try {
            if (bookId === -1) {
                throw new Error('Invalid book ID');
            }
            const bookTags = await get_tags(bookId);
            setTags(bookTags);
        } catch (error) {
            console.error('Failed to fetch tags:', error);
        } finally {
            setLoading(false);
        }
    }

    /*
        loadAllTags :
            Fetches and sets all available tags.
        Parameter(s) :
            - None
        Return :
            - None
    */
    async function loadAllTags() {
        setLoading(true);
        try {
            const fetchedTags = await get_all_tags();
            setAllTags(fetchedTags);
        } catch (error) {
            console.error('Failed to fetch all tags:', error);
        } finally {
            setLoading(false);
        }
    }

    /*
        addTagOnBook :
            Adds a tag to a book and refreshes the tag list.
        Parameter(s) :
            - bookId : number : The ID of the book.
            - tagId : number : The ID of the tag to add.
        Return :
            - None
    */
    async function addTagOnBook(bookId : number, tagId: number) {
        await add_tag_on_book(bookId, tagId);
        loadTagsOfBook();
    }

    /*
        handleAddTagOnBook :
            Processes the form submission for adding a tag to a book.
        Parameter(s) :
            - event : React.FormEvent<HTMLFormElement> : The form event.
        Return :
            - None
    */
    function handleAddTagOnBook(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const tagId = parseInt(formData.get('tagId') as string, 10);

        addTagOnBook(bookId, tagId);
    }

    /*
        removeTagOnBook :
            Removes a tag from a book and refreshes the tag list.
        Parameter(s) :
            - tagId : number : The ID of the tag to remove.
        Return :
            - None
    */
    async function removeTagOnBook(tagId: number) {
        try {
            await remove_tag_on_book(bookId, tagId);
            loadTagsOfBook();
        } catch (error) {
            console.error('Failed to remove tag from the book:', error);
        }
    }

    /*
        handleDeleteTagOnBook :
            Calls the removeTagOnBook function with the tagId to remove the tag from the book.
        Parameter(s) :
            - tagId : number : The ID of the tag to delete.
        Return :
            - None
    */
    function handleDeleteTagOnBook(tagId: number){
        removeTagOnBook(tagId);
    }

    if( loading ){
        return <div>Chargement des tags du livre...</div>;
    }

    return (
        <div>
            <h2>Tags</h2>
            <ul>
                {tags.map((tag) => (
                    <li key={tag.id}>
                        {tag.name}
                        <button onClick={() => handleDeleteTagOnBook(tag.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Ajouter un tag</h2>
            <form onSubmit={handleAddTagOnBook}>
                <select name="tagId" defaultValue="">
                    <option value="" disabled selected>
                        Select a tag...
                    </option>
                    {
                        allTags.filter(allTag => !tags.some(tag => tag.id === allTag.id))
                            .map((tag) => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.name}
                                </option>
                            ))
                    }
                </select>
                <button type="submit">Ajouter</button>
            </form>

        </div>
    );
};

export default BookTags;
