import { PlayerData } from "components/play/play.types";
import React from "react";
import { Button } from "react-bootstrap";

const Player = ({
  player,
  remove,
}: {
  player: PlayerData;
  remove: (p: PlayerData) => void;
}) => {
  return (
    <>
      <p className="player">{player.name}</p>
      <p className="player">{player.balance}</p>
      <button onClick={() => remove(player)} className="danger">
        Remove
      </button>
    </>
  );
};

export default Player;
