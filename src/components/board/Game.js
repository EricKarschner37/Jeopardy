import Board from "./Board";
import PlayerDisplay from "./PlayerDisplay";
import Console from "./Console.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from 'react';

let socket = null;

const Game = (props) => {
  const [categories, setCategories] = useState([]);
  const [clueShown, setClueShown] = useState(false);
  const [answerShown, setAnswerShown] = useState(false);
  const [clue, setClue] = useState("");
  const [answer, setAnswer] = useState("");
  const [squareClicked, setClickedSquares] = useState(Array(5).fill(Array(6).fill(false)))
  const [players, setPlayers] = useState([]);
  const [cost, setCost] = useState(0);
  const [doubleJeopardy, setDoubleJeopardy] = useState(false)

  const showState = (json) => {
    setClue(json.clue)
    setAnswer(json.answer)
    setCost(json.cost)
    setDoubleJeopardy(json.double_jeopardy)

    setPlayers(Object.entries(json.players).map(([name, balance], i) => {return {name: name, balance: balance}}))

    if (json.state === 'question' || json.state === 'buzzed') {
      setClueShown(true)
      setAnswerShown(false)
    } else if (json.state === 'answer') {
      setClueShown(true)
      setAnswerShown(true)
    } else if (json.state === 'daily_double') {
      setClueShown(true)
      setAnswerShown(false)
      setClue("Daily Double!")
      setCost("???")
    } else {
      setClueShown(false)
      setAnswerShown(false)
    }
  }

  const openMessage = {
    request: 'start_game',
    game_num: props.number,
  }

  useEffect(() => {
    //Note: this is poorly done. Should use the function return API from useEffect to close and reopen socket on render

    if (!socket) {
      socket = new WebSocket('wss://jeopardy.karschner.studio/ws/buzzer/server/')
      socket.onopen = (e) => socket.send(JSON.stringify(openMessage))
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);
        console.log(data);

        if (data.message === 'categories') {
          setCategories([...data.categories])
        } else if (data.message === 'state') {
          showState(data)
        }
      }
    }
  })

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
    if (!answerShown && clue !== 'Daily Double!') {
      data.request = 'answer'
    } else if (answerShown) {
      data.request = 'idle'
    }
    socket.send(JSON.stringify(data))
  }

  const beginDoubleJeopardy = () => {
    console.log('begin')
    const data = {
      request: 'start_double',
      game_num: props.number
    };

    setClickedSquares(Array(5).fill(Array(6).fill(false)))

    socket.send(JSON.stringify(data))
  }

  return (
    <Container className="center">
      <Row className="board center">
        <Board categories={categories} clueShown={clueShown} answerShown={answerShown} clue={clue} answer={answer} cost={cost} squareClicked={squareClicked} onSquareClick={handleSquareClick} onDisplayClick={handleDisplayClick} doubleJeopardy={doubleJeopardy}/>
      </Row>
      <Row>
        <Col><PlayerDisplay players={players} /></Col>
        <Col><Console beginDoubleJeopardy={beginDoubleJeopardy} doubleJeopardy={doubleJeopardy} /></Col>
      </Row>
    </Container>
  )
}

export default Game;
