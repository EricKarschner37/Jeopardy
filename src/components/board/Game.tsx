import * as React from "react";
import { useParams } from "react-router-dom";
import { GameState, PlayerData } from "components/play/play.types";
import {
  getGameStateFromSocketMessage,
  isSocketMessageCategories,
  isSocketMessageState,
} from "components/play/play.util";
import { SocketPayload } from "util/sockets.types";
import useSocket from "util/use-socket";
import Board from "components/board/Board";
import PlayerDisplay from "components/board/PlayerDisplay";
import Console from "components/board/Console";
import { Flex } from "components/lib/Flex";
import "./game.scss";

export type GameProps = { gameNum: string };

const BLOCK = "game";

const Game = ({ gameNum }: GameProps) => {
  const [categories, setCategories] = React.useState<string[]>([]);
  const [clueShown, setClueShown] = React.useState(false);
  const [answerShown, setAnswerShown] = React.useState(false);
  const [clue, setClue] = React.useState("");
  const [response, setResponse] = React.useState("");
  const [squareClicked, setClickedSquares] = React.useState(
    Array(5).fill(Array(6).fill(false))
  );
  const [players, setPlayers] = React.useState<PlayerData[]>([]);
  const [cost, setCost] = React.useState<string | number>(0);
  const [doubleJeopardy, setDoubleJeopardy] = React.useState(false);
  const [category, setCategory] = React.useState("");

  const { num } = useParams<{ num: string }>();

  const showState = React.useCallback((json: GameState) => {
    setClue(json.clue);
    setResponse(json.response);
    setCost(json.cost);
    setDoubleJeopardy(json.double);
    setCategory(json.category);

    setPlayers(json.players);

    if (json.name === "clue") {
      setClueShown(true);
      setAnswerShown(false);
    } else if (json.name === "response") {
      setClueShown(true);
      setAnswerShown(true);
    } else if (json.name === "daily_double") {
      setClueShown(true);
      setAnswerShown(false);
      setClue("Daily Double!");
      setCost("???");
    } else if (json.name === "final") {
      setClue(json.category);
      setCost("???");
      setClueShown(true);
      setAnswerShown(false);
    } else if (json.name === "final_clue") {
      setClue(json.clue);
      setCost("???");
      setClueShown(true);
      setAnswerShown(false);
    } else {
      setClueShown(false);
      setAnswerShown(false);
    }
  }, []);

  const handleMessage = React.useCallback(
    (e: MessageEvent) => {
      const data = JSON.parse(e.data);
      console.log(JSON.stringify(data));
      if (isSocketMessageCategories(data)) {
        setCategories(data.categories);
      } else if (isSocketMessageState(data)) {
        showState(getGameStateFromSocketMessage(data));
      }
    },
    [setCategories, showState]
  );

  const socket = useSocket({
    url: `ws://${process.env.REACT_APP_WEBSOCKET_SERVER}/ws/${num}/board`,
    onMessage: handleMessage,
  });

  if (!socket.isConnected) {
    return <h1>Loading...</h1>;
  }

  const handleSquareClick = (row: number, col: number) => {
    revealClue(row, col);
    setSquareClicked(row, col);
  };

  const setSquareClicked = (row: number, col: number) => {
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

  const revealClue = (row: number, col: number) => {
    const data = {
      request: "reveal",
      row: row,
      col: col,
    };
    socket.sendObject(data);
  };

  const handleDisplayClick = () => {
    const data: SocketPayload = {};
    if (!answerShown && clue !== "Daily Double!") {
      data.request = "response";
    } else if (answerShown) {
      data.request = "board";
    }
    socket.sendObject(data);
  };

  const beginDoubleJeopardy = () => {
    console.log("begin");
    const data = {
      request: "start_double",
      game_num: gameNum,
    };

    setClickedSquares(Array(5).fill(Array(6).fill(false)));

    socket.sendObject(data);
  };

  const beginFinalJeopardy = () => {
    const data = {
      request: "start_final",
      game_num: gameNum,
    };

    socket.sendObject(data);
  };

  return (
    <div className={BLOCK}>
      <Board
        categories={categories}
        clueShown={clueShown}
        answerShown={answerShown}
        clue={clue}
        response={response}
        category={category}
        cost={cost}
        squareClicked={squareClicked}
        onSquareClick={handleSquareClick}
        onDisplayClick={handleDisplayClick}
        double={doubleJeopardy}
      />
      <Flex isMaxWidth direction="row" justify="space-evenly">
        <PlayerDisplay socket={socket} players={players} />
        <Console
          beginNextRound={
            doubleJeopardy ? beginFinalJeopardy : beginDoubleJeopardy
          }
          nextRound={doubleJeopardy ? "Final Jeopardy" : "Double Jeopardy"}
        />
      </Flex>
    </div>
  );
};

export default Game;