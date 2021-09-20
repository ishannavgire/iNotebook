import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  const [note, setNote] = useState({ edit_title: "", edit_description: "", edit_tag: "" });

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ edit_title: currentNote.title, edit_description: currentNote.description, edit_tag: currentNote.tag });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Updated Note = " + note.edit_description);
  };

  const ref = useRef(null);

  const onChange = (e) => {
    //Use spread operator
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote />

      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" ref={ref} data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form id="edit_note-form" className="container my-3">
                <div className="mb-3">
                  <label htmlFor="edit_title" className="form-label">
                    Title
                  </label>
                  <input type="text" className="form-control" id="edit_title" name="edit_title" value={note.edit_title} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit_description" className="form-label">
                    Description
                  </label>
                  <input type="text" className="form-control" id="edit_description" name="edit_description" value={note.edit_description} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edit_tag" className="form-label">
                    Tag
                  </label>
                  <input type="text" className="form-control" id="edit_tag" name="edit_tag" value={note.edit_tag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <NoteItem key={note ? note._id : Math.random()} updateNote={updateNote} note={note}></NoteItem>;
        })}
      </div>
    </>
  );
};

export default Notes;
