import React, { useState } from 'react';

const Square = (props) => {
  const handleClick = () => {
    props.onSquareClick(props.row, props.col);
  }

  return (
    <td className="clue" onClick={handleClick}>
      {!props.hasBeenClicked && <p className="cost">{props.cost}</p>}
    </td>
  )
}

export default Square;
