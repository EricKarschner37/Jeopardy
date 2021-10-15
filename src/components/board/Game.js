import Board from "./Board";
import PlayerDisplay from "./PlayerDisplay";
import Console from "./Console.js";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import React, { useState } from "react";
import useSocket from "../../sockets";
import { useParams } from "react-router-dom";

const Game = (props) => {
  const [categories, setCategories] = useState([]);
  const [clueShown, setClueShown] = useState(false);
  const [answerShown, setAnswerShown] = useState(false);
  const [clue, setClue] = useState("");
  const [response, setResponse] = useState("");
  const [squareClicked, setClickedSquares] = useState(
    Array(5).fill(Array(6).fill(false))
  );
  const [players, setPlayers] = useState([]);
  const [cost, setCost] = useState(0);
  const [doubleJeopardy, setDoubleJeopardy] = useState(false);
  const [connected, setConnected] = useState(false);

  const { num } = useParams();

  const showState = (json) => {
    setClue(json.clue);
    setResponse(json.response);
    setCost(json.cost);
    setDoubleJeopardy(json.double);

    setPlayers(
      Object.entries(json.players).map(([name, obj]) => {
        return { name: name, balance: obj.Points };
      })
    );

    if (json.name === "clue") {
      setClueShown(true);
      setAnswerShown(false);
    } else if (json.name === "response") {
      console.log("Showing correct response");
      setClueShown(true);
      setAnswerShown(true);
    } else if (json.name === "daily_double") {
      setClueShown(true);
      setAnswerShown(false);
      setClue("Daily Double!");
      setCost("???");
    } else {
      setClueShown(false);
      setAnswerShown(false);
    }
  };

  const socket = useSocket(
    `wss://${process.env.REACT_APP_WEBSOCKET_SERVER}/ws/${num}/board`,
    true,
    (socket) => {
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data);

        if (data.message === "categories") {
          setCategories([...data.categories]);
        } else if (data.message === "state") {
          showState(data);
        }
      };
      setConnected(true);
    }
  );

  if (!connected) {
    return <h1>Loading...</h1>;
  }

  const handleSquareClick = (row, col) => {
    revealClue(row, col);
    setSquareClicked(row, col);
  };

  const setSquareClicked = (row, col) => {
    setClickedSquares([
      ...squareClicked.slice(0, row),
      [
        ...squareClicked[row].slice(0, col),
        true,
        ...squareClicked[row].slice(col + 1),
      ],
      ...squareClicked.slice(row + 1),
    ]);
  };

  const revealClue = (row, col) => {
    const data = {
      request: "reveal",
      row: row,
      col: col,
    };
    socket.send(JSON.stringify(data));
  };

  const handleDisplayClick = () => {
    const data = {};
    if (!answerShown && clue !== "Daily Double!") {
      data.request = "response";
    } else if (answerShown) {
      data.request = "board";
    }
    socket.send(JSON.stringify(data));
  };

  const beginDoubleJeopardy = () => {
    console.log("begin");
    const data = {
      request: "start_double",
      game_num: props.number,
    };

    setClickedSquares(Array(5).fill(Array(6).fill(false)));

    socket.send(JSON.stringify(data));
  };

  const beginFinalJeopardy = () => {
    const data = {
      request: "start_final",
      game_num: props.number,
    };

    socket.send(JSON.stringify(data));
  };

  return (
    <Container className="center">
      <Row className="board center">
        <Board
          categories={categories}
          clueShown={clueShown}
          answerShown={answerShown}
          clue={clue}
          response={response}
          cost={cost}
          squareClicked={squareClicked}
          onSquareClick={handleSquareClick}
          onDisplayClick={handleDisplayClick}
          doubleJeopardy={doubleJeopardy}
        />
      </Row>
      <Row>
        <Col>
          <PlayerDisplay players={players} />
        </Col>
        <Col>
          {doubleJeopardy && (
            <Console
              beginNextRound={beginDoubleJeopardy}
              nextRound="Double Jeopardy"
            />
          )}
          {!doubleJeopardy && (
            <Console
              beginNextRound={beginFinalJeopardy}
              nextRound="Final Jeopardy"
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
