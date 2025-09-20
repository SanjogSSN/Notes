// src/components/NoteItem.jsx
import React from 'react';
import { noteStore } from '../store/noteStore';

const NoteItem = ({ note }) => {
    return (
        <div className="note-item">
            <p>{note.text}</p>
            <button onClick={() => noteStore.deleteNote(note.id)} title="Delete note" aria-label="Delete note">
                <span style={{fontSize: '1.3rem', display: 'inline-block'}}>🗑️</span>
            </button>
        </div>
    );
};

export default NoteItem;
