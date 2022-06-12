import { PlayerData } from "components/play/play.types";
import React from "react";
import { PlayerSocket } from "util/playerSocket";
import { Socket } from "util/sockets.types";
import Player from "./Player";

type PlayerDisplayProps = {
  socket: Socket;
  players: PlayerData[];
};

const PlayerDisplay = ({ socket, players }: PlayerDisplayProps) => {
  const removePlayer = (player: PlayerData) => {
    const data = {
      request: "remove",
      name: player.name,
    };

    socket.sendObject(data);
  };

  return (
    <table id="player">
      <tr>
        <th className="player">Player</th>
        <th className="player">Balance</th>
      </tr>
      {players
        .sort((a, b) => a.balance - b.balance)
        .map((player) => (
          <Player key={player.name} remove={removePlayer} player={player} />
        ))}
    </table>
  );
};

export default PlayerDisplay;
