import { useState } from "react";
import NoteContext from "./noteContext";
import React from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const auth_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MmQ2MWNjMTM1MzY1NTM0NmIwYTA2In0sImlhdCI6MTYzMTc3MzYxN30.BAG97f5OSHyfrGjCVvu1SHXbaAomUoPHIDGPd_HCRCo";

  const getNotes = async () => {
    let url = `${host}/api/notes/fetchallnotes`;
    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
        "auth-token": auth_token,
      },
    };
    let data = await fetch(new URL(url), options);
    let parseData = await data.json();
    console.log(parseData);
    setNotes(parseData);
  };

  //Add Note
  const addNote = async (title, description, tag) => {
    //Add API call
    console.log("Adding a new Note.");

    let url = `${host}/api/notes/addnote`;
    let data = { title: title, description: description, tag: tag };
    const options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth_token,
      },
      body: JSON.stringify(data),
    };
    let response = await fetch(new URL(url), options);

    const parsedRes = await response.json();

    console.log(parsedRes);
    await getNotes();
  };

  //Update Note
  const editNote = async (id, title, description, tag) => {
    //Add API call
    let url = `${host}/api/notes/updatenote/${id}`;
    let data = { title: title, description: description, tag: tag };
    const options = {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": auth_token,
      },
      body: JSON.stringify(data),
    };
    let response = await fetch(new URL(url), options);

    const parsedRes = await response.json();

    console.log(parsedRes);
    await getNotes();
  };

  //Delete Note
  const deleteNote = async (id) => {
    //Add API call
    let url = `${host}/api/notes/deletenote/${id}`;
    const options = {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "auth-token": auth_token,
      },
    };
    let response = await fetch(new URL(url), options);

    const parsedRes = await response.json();

    console.log(parsedRes);
    console.log("Note with ID:" + id + " deleted!");
    await getNotes();
  };

  return <NoteContext.Provider value={{ notes, getNotes, setNotes, addNote, editNote, deleteNote }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
