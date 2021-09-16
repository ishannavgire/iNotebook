import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

export const Home = () => {
  const context = useContext(noteContext);

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
    context.setNotes(parseData);
  };

  useEffect(() => {
    //Fetch notes from mongo database andadd to notes context
    getNotes();

    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Notes />
    </div>
  );
};
