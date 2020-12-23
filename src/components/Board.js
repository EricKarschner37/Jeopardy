import Square from "./Square";
import React, { useState } from 'react';

const Board = (props) => {
  const [categories, setCategories] = useState(Array(6).fill(<th className="category"><p>Loading...</p></th>)) //initialize as 6 empty strings for display before sever response
  const [clueShown, setClueShown] = useState(false) 
  const [answerShown, setAnswerShown] = useState(false)
  const [clue, setClue] = useState("")
  const [answer, setAnswer] = useState("")
  const [clickedSquares, setClickedSquares] = useState(Array(5).fill(Array(6).fill(false)))
  const socket = props.socket;

  const revealClue = (row, col) => {
    let data = {};
    data.request = 'reveal';
    data.row = row;
    data.col = col;

    console.log(data)
    socket.send(JSON.stringify(data));
  }

  const getCostForRow = (row) => (row + 1) * 200;
  const handleSquareClick = (row, col) => {
    if (clickedSquares[row][col]) return;

    setClickedSquares(oldSquares => [...oldSquares.slice(0, row), [...oldSquares.[row].slice(0, col), true, ...oldSquares[row].slice(col+1)], ...oldSquares.slice(row + 1)])
    revealClue(row, col);
  }
  const handleDisplayClick = () => {
    if (answerShown) {
      setClueShown(false)
      setAnswerShown(false)
    } else {
      setAnswerShown(true)
    }
  }


  const rows = []
  for (let i = 0; i < 5; i++) {
    const clues = []
    for (let j = 0; j < 6; j++) {
      clues.push(<Square cost={getCostForRow(i)} onSquareClick={handleSquareClick} row={i} col={j} hasBeenClicked={clickedSquares[i][j]}/>)
    }
    rows.push(clues)
  }

  socket.onmessage = (e) => {
    console.log(e.data)
    const json = JSON.parse(e.data)
    if (json.message === "state") {
      showState(json)
    } else if (json.message === "categories") {
      setCategories([])
      json.categories.forEach((category, key) => {
        setCategories(prev => prev.concat([<th key={key} className="category"><p>{category}</p></th>]))
      })
    }
  }

  const showState = (json) => {
    console.log(json.clueShown)
    if (json.state === 'question') {
      setClueShown(true);
      setClue(json.clue);
    } else if (json.state === 'answer') {
      setAnswerShown(true);
      setAnswer(json.answer);
    }
  }

  if (clueShown) {
    return (
      <div id="clue_display" onClick={handleDisplayClick}>
        <p id="clue">{clue}</p>
        {answerShown && <p id="answer">{answer}</p>}
      </div>
    )
  }
  return (
    <table id="clue_table">
      <tbody>
        <tr>
          {categories}
        </tr>
        {rows.map((row) => {
            return <tr>{row}</tr>
        })}
      </tbody>
    </table>
  )
}

export default Board;
