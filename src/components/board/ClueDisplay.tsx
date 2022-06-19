import { Flex } from "components/lib/Flex";
import * as React from "react";
import "./clue-display.scss";

interface ClueDisplayProps {
  cost: string | number;
  clue: string;
  response: string;
  category: string;
  isResponseShown: boolean;
  onClick: () => void;
}

const BLOCK = "board-clue-display";

export const ClueDisplay = ({
  cost,
  clue,
  response,
  category,
  isResponseShown,
  onClick,
}: ClueDisplayProps) => {
  return (
    <button className={BLOCK} onClick={onClick}>
      <div className={BLOCK}>
        <p>
          <span className={`${BLOCK}-cost`}>${cost}</span>
          {"\t\t\t|\t\t\t"}
          <span className={`${BLOCK}-category`}>{category}</span>
        </p>
        <p className={`${BLOCK}-clue`}>{clue}</p>
        <p className={`${BLOCK}-response${!isResponseShown ? " hidden" : ""}`}>
          {response}
        </p>
      </div>
    </button>
  );
};
