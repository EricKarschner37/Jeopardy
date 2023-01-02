import { GameStateContext } from "components/play/Play";
import * as React from "react";
import "./player-name.scss";

export const PlayerName = ({
  name,
  playerBuzzed,
}: {
  name: string;
  playerBuzzed: string | null;
}) => {
  const BLOCK = "play_playername";

  const state = React.useContext(GameStateContext);

  const classNames = [`${BLOCK}--root`];
  if (!state.buzzers_open) {
    if (state.buzzed_player === name) {
      classNames.push(`${BLOCK}--root-buzzed`);
    } else {
      classNames.push(`${BLOCK}--root-disabled`);
    }
  }
  const className = classNames.join(" ");

  return (
    <div className={className}>
      <h1 className={`${BLOCK}--name`}>{name}</h1>
    </div>
  );
};
