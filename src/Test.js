import React from "react";
import { useParams } from "react-router-dom";

const Test = () => {
  const { text } = useParams();
  return <p>Your text is: damn {text}</p>;
};

export default Test;
