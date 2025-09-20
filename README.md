# Notes App

A beautiful, modern, and responsive notes app built with React and Vite.

## Features

- Add, view, and delete notes
- Multi-line note input with textarea
- Responsive design for mobile and desktop
- Clean, card-based UI with smooth animations
- State management with Valtio

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
	App.jsx           # Main app component
	App.css           # Main styles
	index.css         # Global resets
	components/
		NoteForm.jsx    # Note input form
		NoteItem.jsx    # Individual note card
	store/
		noteStore.js    # Valtio store for notes
public/
	vite.svg          # Vite logo
```

