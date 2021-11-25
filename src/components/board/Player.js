import React from "react";
import { Button } from "react-bootstrap";

const Player = (props) => {
  return (
    <tr>
      <td className="player">{props.name}</td>
      <td className="player">{props.balance}</td>
      <td className="player" style={{'padding-top': '4px', 'padding-bottom': '4px'}}><Button onClick={() => props.remove(props.name)} variant="danger">Remove</Button></td>
    </tr>
  );
};

export default Player;
