// src/App.jsx
import React from 'react';
import './App.css';
import { useSnapshot } from 'valtio';
import { noteStore } from './store/noteStore';
import NoteForm from './components/NoteForm';
import NoteItem from './components/NoteItem';

const App = () => {
    const snap = useSnapshot(noteStore);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>📝 Notes</h1>
                <p className="subtitle">Your simple & beautiful note keeper</p>
            </header>
            <main className="app-main">
                <NoteForm />
                <div className="notes-list">
                    {snap.notes.length === 0 ? (
                        <p>No notes yet.</p>
                    ) : (
                        snap.notes.map((note) => <NoteItem key={note.id} note={note} />)
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
