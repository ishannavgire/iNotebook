import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: 0 }}>
          <span className="top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "90%", zIndex: "1" }}>
            {note.tag}
          </span>
        </div>
        <div className="card-body">
          <div className="d-flex">
            <div className="mr-auto p-2">
              <h6 className="card-title">{note.title}</h6>
            </div>
            <div className="p-2">
              <i
                className="fas fa-trash-alt"
                onClick={() => {
                  deleteNote(note._id);
                }}
              ></i>
            </div>
            <div className="p-2">
              <i
                className="far fa-edit"
                onClick={() => {
                  updateNote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
