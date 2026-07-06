// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import 'quill/dist/quill.snow.css';
import { useSnapshot } from 'valtio';
import { noteStore } from './store/noteStore';
import NoteForm from './components/NoteForm';
import NoteItem from './components/NoteItem';

const App = () => {
    const snap = useSnapshot(noteStore);
    const [query, setQuery] = useState('');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    useEffect(() => {
        try {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        } catch (e) {}
    }, [theme]);

    const filtered = snap.notes.filter(n => n.text.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="header-brand">
                    <div className="logo">📝</div>
                    <div className="header-copy">
                        <h1>Notes</h1>
                        <p className="subtitle">Your simple & beautiful note keeper</p>
                    </div>
                </div>
                <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label="Toggle theme">{theme === 'light' ? '🌙' : '☀️'}</button>
            </header>
            <main className="app-main">
                <section className="panel note-panel">
                    <NoteForm />
                    <div className="notes-controls">
                        <input
                            className="search-input"
                            placeholder="Search notes..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search notes"
                        />
                        <div className="notes-summary">{filtered.length} / {snap.notes.length} notes</div>
                    </div>
                </section>
                <div className="notes-list">
                    {snap.notes.length === 0 ? (
                        <p className="empty-state">No notes yet.</p>
                    ) : (
                        filtered.map((note) => <NoteItem key={note.id} note={note} />)
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
