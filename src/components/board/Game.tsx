import * as React from "react";
import { useParams } from "react-router-dom";
import { GameState } from "components/play/play.types";
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

export const hasClueBeenShown = (
  row: number,
  col: number,
  hasClueBeenShownBitset: number
): boolean => {
  return ((1 << (row * 6 + col)) & hasClueBeenShownBitset) !== 0;
};

const Game = ({ gameNum }: GameProps) => {
  const [state, setState] = React.useState<GameState>({
    state_type: "Board",
    category: "",
    clue: "",
    response: "",
    cost: 0,
    buzzed_player: "",
    active_player: "",
    players: [],
    round: "Single",
    clues_shown: 0,
  });
  const [categories, setCategories] = React.useState<string[]>([]);
  console.log(categories);
  const clueShown = React.useMemo(
    () => state.state_type !== "Board",
    [state.state_type]
  );
  const answerShown = React.useMemo(
    () => state.state_type === "Response",
    [state.state_type]
  );
  const { num } = useParams<{ num: string }>();

  const showState = React.useCallback((json: GameState) => {
    const overrides =
      json.state_type === "DailyDouble"
        ? {
            clue: "Daily Double!",
            cost: "???",
          }
        : json.state_type === "FinalWager"
        ? {
            clue: "Enter your wager now!",
            cost: "???",
          }
        : json.state_type === "FinalClue"
        ? {
            cost: "???",
          }
        : {};
    setState({
      ...json,
      ...overrides,
    });
  }, []);

  const handleMessage = React.useCallback(
    (e: MessageEvent) => {
      console.log("Received message");
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
    url: `wss://${process.env.REACT_APP_WEBSOCKET_SERVER}/ws/${num}/board`,
    onMessage: handleMessage,
  });

  if (!socket.isConnected) {
    return <h1>Loading...</h1>;
  }

  const handleSquareClick = (row: number, col: number) => {
    revealClue(row, col);
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
    if (state.state_type === "Clue") {
      data.request = "response";
      socket.sendObject(data);
    } else if (answerShown) {
      data.request = "board";
      socket.sendObject(data);
    }
  };

  const beginDoubleJeopardy = () => {
    console.log("begin");
    const data = {
      request: "start_double",
      game_num: gameNum,
    };

    socket.sendObject(data);
  };

  const beginFinalJeopardy = () => {
    const data = {
      request: "start_final",
      game_num: gameNum,
    };

    socket.sendObject(data);
  };

  const endGame = () => {
    fetch(`https://${process.env.REACT_APP_WEBSOCKET_SERVER}/api/end/${num}`, {
      method: "POST",
    });
  };

  return (
    <div className={BLOCK}>
      <Board
        categories={categories}
        clueShown={clueShown}
        answerShown={answerShown}
        onSquareClick={handleSquareClick}
        onDisplayClick={handleDisplayClick}
        {...state}
      />
      <Flex isMaxWidth direction="row" justify="space-evenly">
        <PlayerDisplay socket={socket} players={state.players} />
        <Console
          roundAction={
            state.round === "Double"
              ? beginFinalJeopardy
              : state.round === "Final"
              ? endGame
              : beginDoubleJeopardy
          }
          roundActionLabel={
            state.round === "Double"
              ? "Begin Final Jeopardy"
              : state.round === "Single"
              ? "Begin Double Jeopardy"
              : "End Game"
          }
        />
      </Flex>
    </div>
  );
};

export default Game;
