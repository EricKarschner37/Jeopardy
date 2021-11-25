import React from "react";
import Player from "./Player";

const PlayerDisplay = (props) => {
  const removePlayer = (name) => {
    const data = {
      request: "remove",
      name: name,
    };

    props.socket.send(JSON.stringify(data));
  };

  return (
    <table id="player">
      <tr>
        <th className="player">Player</th>
        <th className="player">Balance</th>
      </tr>
      {props.players
        .sort((a, b) => a.balance - b.balance)
        .map((player) => (
          <Player key={player.name} remove={removePlayer} name={player.name} balance={player.balance} />
        ))}
    </table>
  );
};

export default PlayerDisplay;
