import React from "react";

const Player = (props) => {
  return (
    <tr>
      <td className="player">{props.name}</td>
      <td className="player">{props.balance}</td>
    </tr>
  );
};

export default Player;
