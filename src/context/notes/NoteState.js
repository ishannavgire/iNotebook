import { useState } from "react";
import NoteContext from "./noteContext";
import React from "react";

const initialNotes = [
  {
    _id: "6142e5f418ff94cad6edb921",
    user: "6142d61cc1353655346b0a06",
    title: "Artificial Intelligence",
    description: "machine learning models for regression",
    tag: "AITML",
    date: "2021-09-16T06:36:36.331Z",
    __v: 0,
  },
  {
    _id: "6143398ab484989a35389cbb",
    user: "6142d61cc1353655346b0a06",
    title: "Bollywood movies",
    description: "SRK movie with Kajol",
    tag: "BollywoodMovies",
    date: "2021-09-16T12:33:14.239Z",
    __v: 0,
  },
  "abcd"
];

const NoteState = (props) => {
  const [notes, setNotes] = useState(initialNotes);
  return <NoteContext.Provider value={{ notes, setNotes }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
