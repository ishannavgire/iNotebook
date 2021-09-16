import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

export const Home = () => {
  const notes = useContext(noteContext);

  const getNotes = async () => {
    let url = "http://localhost:5000/api/notes/fetchallnotes";
    const options = {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0MmQ2MWNjMTM1MzY1NTM0NmIwYTA2In0sImlhdCI6MTYzMTc3MzYxN30.BAG97f5OSHyfrGjCVvu1SHXbaAomUoPHIDGPd_HCRCo",
      },
    };
    let data = await fetch(new URL(url), options);
    let parseData = await data.json();
    console.log(parseData);
    notes.setNotes(parseData);
  };

  useEffect(() => {
    //Fetch notes from mongo database andadd to notes context
    getNotes();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
      </div>
      <form className="container my-3">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <Notes></Notes>
    </div>
  );
};
