import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PlayerBalance } from "components/board/PlayerBalance/PlayerBalance";
import { PlayerData } from "components/play/play.types";
import React from "react";

const Player = ({
  player,
  remove,
  setBalance,
}: {
  player: PlayerData;
  remove: (p: PlayerData) => void;
  setBalance: (p: PlayerData, newBalance: number) => void;
}) => {
  return (
    <>
      <button onClick={() => remove(player)} className="danger">
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <p className="player">{player.name}</p>
      <PlayerBalance
        balance={player.balance}
        onBalanceChanged={(num) => setBalance(player, num)}
      />
    </>
  );
};

export default Player;
