import { PlayerData } from "components/play/play.types";
import React from "react";
import { PlayerSocket } from "util/playerSocket";
import { Socket } from "util/sockets.types";
import Player from "./Player";
import "./player-display.scss";

type PlayerDisplayProps = {
  socket: Socket;
  players: PlayerData[];
};

const BLOCK = "board_player-display";

const PlayerDisplay = ({ socket, players }: PlayerDisplayProps) => {
  const removePlayer = (player: PlayerData) => {
    const data = {
      request: "remove",
      name: player.name,
    };

    socket.sendObject(data);
  };

  return (
    <div className={BLOCK}>
      <h5 className="player">Player</h5>
      <h5 className="player">Balance</h5>
      <div />
      {players
        .sort((a, b) => b.balance - a.balance)
        .map((player) => (
          <Player key={player.name} remove={removePlayer} player={player} />
        ))}
    </div>
  );
};

export default PlayerDisplay;
