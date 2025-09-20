// src/store/noteStore.js
import { proxy, subscribe } from 'valtio';

const LOCAL_STORAGE_KEY = 'notes-app-data';

const savedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

export const noteStore = proxy({
    notes: savedNotes,
    addNote(text) {
        const newNote = {
            id: Date.now(),
            text,
        };
        noteStore.notes.push(newNote);
    },
    deleteNote(id) {
        noteStore.notes = noteStore.notes.filter(note => note.id !== id);
    }
});

// Auto-save on any change
subscribe(noteStore, () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(noteStore.notes));
});
