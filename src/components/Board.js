import Square from "./Square";
import React from 'react';

const Board = (props) => {
  console.log(`categories: ${props.categories}`)

  const getCostForRow = (row) => (row + 1) * 200;

  const rows = []
  for (let i = 0; i < 5; i++) {
    const clues = []
    for (let j = 0; j < 6; j++) {
      clues.push(<Square cost={getCostForRow(i)} onSquareClick={props.onSquareClick} row={i} col={j} hasBeenClicked={props.squareClicked[i][j]}/>)
    }
    rows.push(clues)
  }

  if (props.clueShown) {
    return (
      <div id="clue_display" onClick={props.onDisplayClick}>
        <p id="cost">${props.cost}</p>
        <p id="clue">{props.clue}</p>
        {props.answerShown && <p id="answer">{props.answer}</p>}
      </div>
    )
  }
  return (
    <table id="clue_table">
      <tbody>
        <tr>
          {props.categories.map(category => <th className="category"><p><strong>{category}</strong></p></th>)}
        </tr>
        {rows.map((row) => {
            return <tr>{row}</tr>
        })}
      </tbody>
    </table>
  )
}

export default Board;
