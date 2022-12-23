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

  const classNames = [`${BLOCK}--root`];
  if (playerBuzzed !== null) {
    if (playerBuzzed === name) {
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
