import React, {useState} from "react";
import {Pencil} from "lucide-react";

interface EditableTextProps {
    value: string;
    onUpdate: (newValue: string) => void;
}

const EditableText = ({ value, onUpdate } : EditableTextProps) => {
    const [editing, setEditing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    /*
    handleSubmit :
        Handles the form submission event for updating the text value.
    Parameter(s) :
        - event : React.FormEvent<HTMLFormElement> : The form submission event.
    Return :
        - None
    */
     function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setUpdating(true);
        try {
            console.log('inputValue:', inputValue);
            onUpdate(inputValue);
            setEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setUpdating(false);
        }
    }

    if (editing) {
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={updating}
                />
                <button type="submit" disabled={updating}>
                    {updating ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => setEditing(false)} disabled={updating}>
                    Cancel
                </button>
            </form>
        );
    }

    return (
        <>
            {value}
            <button
                onClick={() => setEditing(true)}
                style={{
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '8px'
                }}
            >
                <Pencil size={16} style={{ display: 'block' }} />
            </button>
        </>
    );
};

export default EditableText;
