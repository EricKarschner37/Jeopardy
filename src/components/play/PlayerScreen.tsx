import { Register } from "components/play/Join";
import Play from "components/play/Play";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const isValidName = (name: string) => {
  const re = /^[a-z\d-_\s]+$/i;
  return name.length < 24 && name.length > 0 && re.test(name);
};

const PlayerScreen = () => {
  const [name, setName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { num } = useParams<{ num: string }>();

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
