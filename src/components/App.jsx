import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Modal from "./Modal";
import axios from "axios";
import { Grow, Zoom} from '@material-ui/core';

function App() {
  console.log("App Component Rendered!");
  const [notes, setNotes] = useState([]);
  const [expand, setExpand] = useState(false);
  const [modal, setModal] = useState(false);
  const [editNote, setEditNote] = useState({});

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
  function putNote(data) {
    axios.put(`/api/notes/${data.id}`, data)
        .then(response => {
          console.log(response.data);
        })
      .then(response => axios.get('/api/notes'))
      .then(response => setNotes(response.data))
      .catch((err) => console.error(err));
    }
  function deleteNote(id) {
    axios.delete(`/api/notes/${id}`)
	  .then(response => axios.get('/api/notes'))
    .then(response => setNotes(response.data));
  }

  function handleMouseUp(e){
    console.log("%c mouseup even app.jsx", "color: red;", e)
    var container = document.getElementById("i-form");

    (container.contains(e.target)) ? setExpand(true)
                                   : setExpand(false);
    console.log(e.target);
  }

  function editData(data) {
      setModal(true);
      setEditNote(data);
  }

  return (
    <div style={{position: "relative", width: "100vw"}}>
    { !modal && <div onMouseUp={handleMouseUp}>
      <Header />
      <CreateArea formId={"i-form"} onAdd={addNote} expand={expand} />
      <div className="flex">

      {notes.map((noteItem, index) => {
        return (

          (<Zoom in={true} >
              <Note
                key={noteItem.id}
                data={noteItem}
                onDelete={deleteNote}
                editData={editData}
                />
            </Zoom>)
        );
      })}
	</div>
      <Footer />
    </div> }
    {modal &&
        <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout='auto' children>
            <Modal editNote={editNote} putNote={putNote} setModal={setModal}/>
        </Grow>
        }
    </div>
  );
}

export default App;
