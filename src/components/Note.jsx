import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


function Note(props) {
  const {id, title, content} = props.data;

  function handleClick() {
    props.onDelete(id);
  }
  function handleButtonModal(e){
      props.editData(props.data);
  }


  return (

    <div id="outer" className="note">
      <h1>{title}</h1>
      <p>{content}</p>
          <button onClick={handleButtonModal}>
            <EditIcon />
          </button>
          <button onClick={handleClick}>
            <DeleteIcon />
            </button>
       </div>
  );
}

export default Note;
