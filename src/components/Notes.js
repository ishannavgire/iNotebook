import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = () => {
  const notes = useContext(noteContext);

  return (
    <div className="row my-4">
      <h1>Your Notes</h1>
      {notes.notes.map((note) => {
        return <NoteItem key={note._id} note={note}></NoteItem>;
      })}
    </div>
  );
};

export default Notes;
