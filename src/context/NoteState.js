import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const s1 = {
    name: "ishan",
    class: "7a",
  };

  const [state, setstate] = useState(s1);

  const update = () => {
    setTimeout(() => {
      setstate({ name: "popye", class: "9b" });
    }, 1000);
  };

  return <NoteContext.Provider value={{ state, update }}>{props.children}</NoteContext.Provider>;
};

export default NoteState;
