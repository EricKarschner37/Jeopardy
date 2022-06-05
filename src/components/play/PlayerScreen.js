import React, { useState } from "react";
import { Register } from "./Join";
import Play from "./Play";
import { useParams } from "react-router-dom";

const isValidName = (name) => {
  const re = /^[a-z\d-_\s]+$/i;
  return name.length < 24 && name.length > 0 && re.test(name);
};

const PlayerScreen = () => {
  const [name, setName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { num } = useParams();

  const joinGame = () => {
    if (isValidName(name)) {
      setHasSubmitted(true);
    }
  };

  if (hasSubmitted) {
    return <Play name={name} gameNum={num} />;
  } else {
    return <Register name={name} onNameChange={setName} onSubmit={joinGame} />;
  }
};

export default PlayerScreen;
