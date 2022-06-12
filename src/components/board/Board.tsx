import Square from "./Square";
import React from "react";
import { GameState } from "components/play/play.types";

type BoardProps = {
  categories: string[];
  clueShown: boolean;
  answerShown: boolean;
  onSquareClick: (row: number, col: number) => void;
  onDisplayClick: () => void;
  squareClicked: boolean[][];
  cost: number | string;
} & Pick<GameState, "clue" | "response" | "double">;

const Board = ({
  double,
  categories,
  clueShown,
  answerShown,
  clue,
  response,
  cost,
  onSquareClick,
  onDisplayClick,
  squareClicked,
}: BoardProps) => {
  const getCostForRow = (row: number) =>
    double ? (row + 1) * 400 : (row + 1) * 200;

  const rows = [];
  for (let i = 0; i < 5; i++) {
    const clues = [];
    for (let j = 0; j < 6; j++) {
      clues.push(
        <Square
          cost={getCostForRow(i)}
          onSquareClick={onSquareClick}
          row={i}
          col={j}
          hasBeenClicked={squareClicked[i][j]}
        />
      );
    }
    rows.push(clues);
  }

  if (clueShown) {
    return (
      <div
        className="center clickable"
        id="clue_display"
        onClick={onDisplayClick}
      >
        <p className="cost noselect">${cost}</p>
        <p id="clue" className="noselect clickable">
          {clue}
        </p>
        {answerShown && (
          <p id="answer" className="noselect clickable">
            {response}
          </p>
        )}
        {!answerShown && (
          <p id="answer" className="hidden noselect clickable">
            {response}
          </p>
        )}
      </div>
    );
  }

  console.log(JSON.stringify(categories));
  return (
    <table id="clue_table">
      <tbody>
        <tr>
          {categories.map((category) => (
            <th key={category} className="category noselect">
              <p>
                <strong>{category}</strong>
              </p>
            </th>
          ))}
        </tr>
        {rows.map((row, index) => {
          return <tr key={index}>{row}</tr>;
        })}
      </tbody>
    </table>
  );
};

export default Board;
