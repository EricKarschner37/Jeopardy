import "./board.scss";
import * as React from "react";
import { GameState } from "components/play/play.types";
import { CategorySquare, Square } from "components/board/Square";
import { ClueDisplay } from "components/board/ClueDisplay";
import { hasClueBeenShown } from "components/board/Game";

type BoardProps = {
  categories: string[];
  clueShown: boolean;
  answerShown: boolean;
  onSquareClick: (row: number, col: number) => void;
  onDisplayClick: () => void;
  cost: number | string;
} & Pick<GameState, "clue" | "response" | "round" | "category" | "clues_shown">;

const BLOCK = "board";

const Board = ({
  round,
  categories,
  clueShown,
  answerShown,
  clue,
  response,
  category,
  cost,
  onSquareClick,
  onDisplayClick,
  clues_shown,
}: BoardProps) => {
  const getCostForRow = (row: number) =>
    round === "Double" ? (row + 1) * 400 : (row + 1) * 200;

  const rows = [];
  for (let i = 0; i < 5; i++) {
    const clues = [];
    for (let j = 0; j < 6; j++) {
      clues.push(
        <Square
          key={`${i}-${j}`}
          cost={getCostForRow(i)}
          onSquareClick={onSquareClick}
          row={i}
          col={j}
          hasBeenClicked={hasClueBeenShown(i, j, clues_shown)}
        />
      );
    }
    rows.push(clues);
  }

  if (clueShown) {
    return (
      <ClueDisplay
        cost={cost}
        clue={clue}
        response={response}
        category={category}
        isResponseShown={answerShown}
        onClick={onDisplayClick}
      />
    );
  }

  return (
    <div className={BLOCK}>
      {categories.map((category, index) => (
        <CategorySquare category={category} key={index} />
      ))}
      {rows}
    </div>
  );
};

export default Board;
