import React from "react";

const Square = (props) => {
  const handleClick = () => {
    if (!props.hasBeenClicked) props.onSquareClick(props.row, props.col);
  };

  let pClasses = "cost noselect";
  if (props.hasBeenClicked) {
    pClasses += " clicked";
  }

  let tdClasses = "clue noselect";
  if (props.hasBeenClicked) {
    tdClasses += " clicked";
  }

  return (
    <td className={tdClasses} onClick={handleClick}>
      <p className={pClasses}>{props.cost}</p>
    </td>
  );
};

export default Square;
