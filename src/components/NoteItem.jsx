// src/components/NoteItem.jsx
import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import { noteStore } from '../store/noteStore';

const NoteItem = ({ note }) => {
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(note.text);
    const editorContainerRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        setValue(note.text);
    }, [note.text]);

    useEffect(() => {
        if (!editing || !editorContainerRef.current || quillRef.current) return;

        const container = editorContainerRef.current;

        quillRef.current = new Quill(container, {
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link'],
                    ['clean']
                ]
            },
            theme: 'snow'
        });

        quillRef.current.root.innerHTML = value;
        quillRef.current.on('text-change', () => {
            setValue(quillRef.current.root.innerHTML);
        });

        return () => {
            if (quillRef.current) {
                quillRef.current.off('text-change');
                quillRef.current = null;
            }
            if (editorContainerRef.current) {
                editorContainerRef.current.innerHTML = '';
            }
        };
    }, [editing]);

    const handleSave = () => {
        const val = quillRef.current ? quillRef.current.root.innerHTML : value;
        const plain = val.replace(/<(.|\n)*?>/g, '').trim();
        if (!plain) return;
        noteStore.updateNote(note.id, val);
        setEditing(false);
    };

    return (
        <div className="note-item">
            {editing ? (
                <div className="note-edit">
                    <div ref={editorContainerRef} className="note-editor" />
                    <div className="note-edit-actions">
                        <button type="button" onClick={handleSave} className="note-form-btn">Save</button>
                        <button type="button" onClick={() => { setValue(note.text); setEditing(false); }} className="note-form-btn cancel-btn">Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="note-content" dangerouslySetInnerHTML={{ __html: note.text }} />
                    <div className="note-actions">
                        <span type="button" onClick={() => setEditing(true)} title="Edit note" aria-label="Edit note">✏️</span>
                        <span type="button" onClick={() => noteStore.deleteNote(note.id)} title="Delete note" aria-label="Delete note">🗑️</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default NoteItem;
