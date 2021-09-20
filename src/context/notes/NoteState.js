import { useState } from "react";
import NoteContext from "./noteContext";
import React from "react";

const initialNotes = [
  // {
  //   _id: "6143398ab484989a353678bfgt",
  //   user: "6142d61cc1353655346b0a06",
  //   title: "Default Note title",
  //   description: "Default initial Note",
  //   tag: "Default Note",
  //   date: "2021-09-16T12:33:14.239Z",
  //   __v: 0,
  // },
];
// const initialNotes = [
// {
//   _id: "6142e5f418ff94cad6edb921",
//   user: "6142d61cc1353655346b0a06",
//   title: "Artificial Intelligence",
//   description: "machine learning models for regression",
//   tag: "AITML",
//   date: "2021-09-16T06:36:36.331Z",
//   __v: 0,
// },
// {
//   _id: "6143398ab484989a35389cbb",
//   user: "6142d61cc1353655346b0a06",
//   title: "Bollywood movies",
//   description: "SRK movie with Kajol",
//   tag: "BollywoodMovies",
//   date: "2021-09-16T12:33:14.239Z",
//   __v: 0,
// }
// ];

const NoteState = (props) => {
  const [notes, setNotes] = useState(initialNotes);

  //Add API call

  //Add Note
  const addNote = (title, description, tag) => {
    console.log("Adding a new Note.");

    const note = {
      _id: "6143398ab484989a35389cbb1111",
      user: "6142d61cc1353655346b0a06",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-16T12:33:14.239Z",
      __v: 0,
    };
    setNotes(notes.push(note));
  };

  //Update Note
  const editNote = () => {};

  //Delete Note
  const deleteNote = (id) => {
    //Add API call
    console.log("Note with ID:" + id + " deleted!");
    //update state
  };

  return <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
