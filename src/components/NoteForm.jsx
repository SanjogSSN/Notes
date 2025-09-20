// src/components/NoteForm.jsx
import React, { useState } from 'react';
import { noteStore } from '../store/noteStore';

const NoteForm = () => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        noteStore.addNote(text);
        setText('');
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write a note..."
                autoFocus
                rows={3}
                className="note-textarea"
            />
            <div className="note-form-actions">
                <button type="submit" className="note-form-btn">
                    Add
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
