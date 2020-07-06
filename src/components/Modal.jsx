import React from "react";
import CreateArea from "./CreateArea";

const Modal = (props) => {

    function handleMouseUp(e){
      console.log("%c Modal mouseup event", "color: purple;");
      var container = document.getElementById("i-form-popup");

      !(container.contains(e.target)) && props.setModal(false);

      console.log(e.target);
    }

    function addNote(data){
            props.putNote(data);
            props.setModal(false);
    }

    return (
        <div className="overlay" onMouseUp={handleMouseUp}>
            <CreateArea
                formId={"i-form-popup"}
                onAdd={addNote}
                expand={true}
                data={props.editNote}
            />
        </div>
    );
};

export default Modal;
