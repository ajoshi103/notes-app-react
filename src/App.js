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
        }
    };

    const addNote = async () => {
        if (content.trim() === "") return;
        try {
            await axios.post("http://localhost:3001/notes", { content });
            setContent("");
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/notes/${id}`);
            fetchNotes();
        } catch (err) {
            console.error(err);
        }
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
                    {notes.map((note) => (
                        <div  key={note.id} className="note">
                       
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
