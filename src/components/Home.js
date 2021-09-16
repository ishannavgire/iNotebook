import React, { useContext, useEffect } from "react";
import noteContext from "../context/noteContext";

export const Home = () => {
  const data = useContext(noteContext);

  useEffect(() => {
    data.update();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      This is Home - {data.state.name} and {data.state.class}
    </div>
  );
};
