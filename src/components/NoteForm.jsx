// src/components/NoteForm.jsx
import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import { noteStore } from '../store/noteStore';

const NoteForm = () => {
    const [content, setContent] = useState('');
    const editorContainerRef = useRef(null);
    const quillRef = useRef(null);

    useEffect(() => {
        // if (!editorContainerRef.current || quillRef.current) return;

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

        quillRef.current.on('text-change', () => {
            setContent(quillRef.current.root.innerHTML);
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
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const plain = content.replace(/<(.|\n)*?>/g, '').trim();
        if (!plain) return;
        noteStore.addNote(content);
        setContent('');
        if (quillRef.current) {
            quillRef.current.setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="note-form">
            <div className="note-editor" ref={editorContainerRef} />
            <div className="note-form-actions">
                <button type="submit" className="note-form-btn">
                    Add
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
