import React, {useState} from "react";
import {Pencil} from "lucide-react";

interface EditableTextProps {
    value: string;
    onUpdate: (newValue: string) => Promise<void>;
    reloadMethod: () => void;
}

const EditableText = ({ value, onUpdate, reloadMethod } : EditableTextProps) => {
    const [editing, setEditing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await onUpdate(inputValue);
            setEditing(false);
        } catch (error) {
            console.error(error);
        } finally {
            setUpdating(false);
            reloadMethod();
        }
    };

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
