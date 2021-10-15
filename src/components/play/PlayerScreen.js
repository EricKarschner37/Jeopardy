import React, { useState } from "react";
import Join from "./Join";
import Play from "./Play";
import useSocket from "../../sockets";
import { useParams } from "react-router-dom";

const isValidName = (name) => {
  const re = /^[a-z\d-_\s]+$/i;
  return name.length < 24 && name.length > 0 && re.test(name);
};

const PlayerScreen = () => {
  const [name, setName] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [connected, setConnected] = useState(false);
  const { num } = useParams();
  const socket = useSocket(
    `wss://${process.env.REACT_APP_WEBSOCKET_SERVER}/ws/${num}/buzzer`,
    hasSubmitted,
    (socket) => {
      setConnected(true);
      const data = { request: "register", name: name };
      socket.send(JSON.stringify(data));
    }
  );

  const joinGame = () => {
    if (isValidName(name)) {
      setHasSubmitted(true);
    }
  };

  if (hasSubmitted) {
    if (connected) {
      return <Play name={name} socket={socket} />;
    } else {
      return <h1>Loading...</h1>;
    }
  } else {
    return <Join name={name} onNameChange={setName} onSubmit={joinGame} />;
  }
};

export default PlayerScreen;
