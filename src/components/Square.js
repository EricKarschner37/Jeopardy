import React, { useState } from 'react';

const Square = (props) => {
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  const handleClick = () => {
    if (!hasBeenClicked) {
      setHasBeenClicked(true);
      props.onSquareClick(props.row, props.col);
    }
  }

  return (
    <td className="clue" onClick={handleClick}>
      {!hasBeenClicked && <p className="cost">{props.cost}</p>}
    </td>
  )
}

export default Square;
