import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import image_icon from "./delete.png";
import "./App.css"; // Make sure to create and import this CSS file

function App() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await axios.get("http://localhost:3001/notes");
            setNotes(res.data);
        } catch (err) {
            console.error(err);
            // Load notes from local storage if server fetch fails
            const localNotes = JSON.parse(localStorage.getItem("notes")) || [];
            setNotes(localNotes);
        }
    };

    const addNote = async () => {
        if (content.trim() === "") return;
        const newNote = { content, created_at: new Date().toISOString() };

        try {
            await axios.post("http://localhost:3001/notes", newNote);
            setContent("");
            fetchNotes(); // Refresh notes after adding
        } catch (err) {
            console.error(err);
            // Save to local storage as a fallback
            saveNoteToLocal(newNote);
            setContent("");
        }
    };

    const saveNoteToLocal = (note) => {
        const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
        existingNotes.push(note);
        localStorage.setItem("notes", JSON.stringify(existingNotes));
        setNotes(existingNotes); // Update state to reflect new note
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/notes/${id}`);
            fetchNotes();
        } catch (err) {
            console.error(err);
            // Remove from local storage if server deletion fails
            deleteNoteFromLocal(id);
        }
    };

    const deleteNoteFromLocal = (id) => {
        const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
        const updatedNotes = existingNotes.filter(note => note.id !== id);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
        setNotes(updatedNotes); // Update state to reflect deletion
    };

    return (
        <div className="main">
            <Navbar />

            <div className="main-container">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Take a note..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="note-input"
                    />
                    <button onClick={addNote} className="add-note-button">
                        Add Note
                    </button>
                </div>

                <div className="notes-container">
                    {notes.map((note, index) => (
                        <div key={index} className="note">
                            <p>{note.content}</p>
                            <small>{new Date(note.created_at).toLocaleString()}</small>
                            <button id="del" onClick={() => deleteNote(note.id)} className="delete-button">
                                <img src={image_icon} alt="delete" width={17} height={17} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
