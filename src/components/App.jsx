import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
	axios.get('/api/notes')
	    .then(response => setNotes(response.data));
  }, []); // useEffect with '()' and '[]' parameters: initial call to backend once. 

  function addNote(newNote) {
	axios.post('/api/notes', newNote)
          .then(response => {
    		setNotes(prevNotes => {
      			return [...prevNotes, response.data];
    		});
          });
  }

  function deleteNote(id) {
    axios.delete(`/api/notes/${id}`)
	  .then(response => axios.get('/api/notes'))
          .then(response => setNotes(response.data));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
	    date={noteItem.date.toLocaleString('en-US', {hour12: false})}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
