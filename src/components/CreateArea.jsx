import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Zoom } from "@material-ui/core/";


function CreateArea(props) {

  console.log("createArea Rendered!");
  const [note, setNote] = useState( props.data ? props.data
                                        : {title: "", content: ""}
                                  );

function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({title: "", content: ""});
    event.preventDefault();
  }

  return (


    <div className="form-container">
      <form id={props.formId} className="create-note" >
        {(props.expand) && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={ props.expand ? 3 : 1}
        />
        {props.expand ? (
          <Zoom in={true}>
            <Fab onClick={submitNote}>
              <AddIcon />
            </Fab>
          </Zoom>
        ) : null}

      </form>
      </div>
  );
}

export default CreateArea;
