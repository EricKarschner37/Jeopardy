import * as React from "react";

type SquareProps = {
  row: number;
  col: number;
  cost: number;
  hasBeenClicked: boolean;
  onSquareClick: (row: number, col: number) => void;
}

const Square = ({ hasBeenClicked, onSquareClick, row, col, cost }: SquareProps) => {
  const handleClick = () => {
    if (!hasBeenClicked) onSquareClick(row, col);
  };

  let pClasses = "cost noselect";
  if (hasBeenClicked) {
    pClasses += " clicked";
  }

  let tdClasses = "clue noselect";
  if (hasBeenClicked) {
    tdClasses += " clicked";
  }

  return (
    <td className={tdClasses} onClick={handleClick}>
      <p className={pClasses}>{cost}</p>
    </td>
  );
};

export default Square;
