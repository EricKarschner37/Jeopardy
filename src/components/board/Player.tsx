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
    <tr>
      <td className="player">{player.name}</td>
      <td className="player">{player.balance}</td>
      <td
        className="player"
        style={{ paddingTop: "4px", paddingBottom: "4px" }}
      >
        <Button onClick={() => remove(player)} variant="danger">
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default Player;
