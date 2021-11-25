import React from "react";
import { Button } from "react-bootstrap";

const Player = (props) => {
  return (
    <tr>
      <td className="player">{props.name}</td>
      <td className="player">{props.balance}</td>
      <Button onClick={() => props.remove(props.name)} variant="danger">Remove</Button>
    </tr>
  );
};

export default Player;
