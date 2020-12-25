import Board from "./Board";
import PlayerDisplay from "./PlayerDisplay";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import React, { useState } from 'react';

let socket = null;

const Game = (props) => {
  const [categories, setCategories] = useState([]);
  const [clueShown, setClueShown] = useState(false);
  const [answerShown, setAnswerShown] = useState(false);
  const [clue, setClue] = useState("");
  const [answer, setAnswer] = useState("");
  const [squareClicked, setClickedSquares] = useState(Array(5).fill(Array(6).fill(false)))

  const showState = (json) => {
    setClue(json.clue)
    setAnswer(json.answer)

    if (json.state === 'question') {
      setClueShown(true)
      setAnswerShown(false)
    } else if (json.state === 'answer') {
      setClueShown(true)
      setAnswerShown(true)
    } else {
      setClueShown(false)
      setAnswerShown(false)
    }
  }

  const openMessage = {
    request: 'start_game',
    game_num: props.number,
  }

  if (!socket) {
    socket = new WebSocket('wss://jeopardy.karschner.studio/ws/buzzer/server/')
    socket.onopen = (e) => socket.send(JSON.stringify(openMessage))
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);

      if (data.message === 'categories') {
        console.log(`got categories: ${data.categories}`)

        setCategories(data.categories)
      } else if (data.message === 'state') {
        showState(data)
      }
    }
  }

  const handleSquareClick = (row, col) => {
    revealClue(row, col);
    setSquareClicked(row, col);
  }

  const setSquareClicked = (row, col) => {
    setClickedSquares(
      [...squareClicked.slice(0, row), [...squareClicked[row].slice(0, col), true, ...squareClicked[row].slice(col+1)], ...squareClicked.slice(row+1)]
    )
  }

  const revealClue = (row, col) => {
    let data = {
      request: 'reveal',
      row: row,
      col: col,
    }
    socket.send(JSON.stringify(data));
  }

  const handleDisplayClick = () => {
    const data = {};
    if (!answerShown) {
      data.request = 'answer'
    } else {
      data.request = 'idle'
    }
    socket.send(JSON.stringify(data))
  }

  return (
    <Container fluid>
      <Row>
        <Col><Board categories={categories} clueShown={clueShown} answerShown={answerShown} clue={clue} answer={answer} squareClicked={squareClicked} onSquareClick={handleSquareClick} onDisplayClick={handleDisplayClick}/></Col>
      </Row>
      <Row>
        <Col><PlayerDisplay players={[{name: "Eric", balance: 500}]} /></Col>
      </Row>
    </Container>
  )
}

export default Game;
