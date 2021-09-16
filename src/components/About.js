import React, { useContext, useEffect } from "react";
import noteContext from "../context/noteContext";

const About = () => {
  const data = useContext(noteContext);

  useEffect(() => {
    data.update();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      This is About - {data.state.name} and {data.state.class}
    </div>
  );
};

export default About;
