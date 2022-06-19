import { Flex } from "components/lib/Flex";
import "./square.scss";
import * as React from "react";

const BLOCK = "board-square";

type SquareProps = {
  row: number;
  col: number;
  cost: number;
  hasBeenClicked: boolean;
  onSquareClick: (row: number, col: number) => void;
};

export const CategorySquare = ({ category }: { category: string }) => {
  return (
    <div className={BLOCK}>
      <p>
        <strong>{category}</strong>
      </p>
    </div>
  );
};

export const Square = ({
  hasBeenClicked,
  onSquareClick,
  row,
  col,
  cost,
}: SquareProps) => {
  const handleClick = () => {
    if (!hasBeenClicked) onSquareClick(row, col);
  };

  return (
    <button
      className={BLOCK}
      disabled={hasBeenClicked}
      type="button"
      onClick={handleClick}
    >
      {!hasBeenClicked && (
        <Flex isMaxWidth isMaxHeight justify="center" alignContent="center">
          <p>{cost}</p>
        </Flex>
      )}
    </button>
  );
};
