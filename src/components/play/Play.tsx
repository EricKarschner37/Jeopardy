import { GameState } from "components/play/play.types";
import { PlayerName } from "components/play/PlayerName/PlayerName";
import * as React from "react";
import { Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { usePlayerSocket } from "../../util/playerSocket";
import { LoadingState } from "../lib/LoadingState";
import "./play.scss";

type PlayProps = {
  name: string;
  gameNum: string;
};

const initialState: GameState = {
  state_type: "board",
  category: "",
  clue: "",
  response: "",
  cost: "",
  buzzed_player: "",
  active_player: "",
  players: [],
  round: "Single",
  clues_shown: 0,
  buzzers_open: false,
};

export const GameStateContext = React.createContext(initialState);

const Play = ({ name, gameNum }: PlayProps) => {
  const [state, setState] = React.useState(initialState);
  const [clue, setClue] = React.useState("Welcome to Jeopardy!");
  const [answer, setAnswer] = React.useState("");
  const [playerBuzzed, setPlayerBuzzed] = React.useState<string | null>(null);
  const [needWager, setNeedWager] = React.useState(false);
  const [needResponse, setNeedResponse] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [toastVariant, setToastVariant] = React.useState("bg-primary");

  const showState = (json: GameState) => {
    setClue(
      json.state_type === "DailyDouble"
        ? "Daily Double!"
        : json.state_type === "final"
        ? json.category
        : json.clue
    );
    setAnswer(
      json.state_type === "Response" || json.state_type === "Board"
        ? json.response
        : ""
    );
    setPlayerBuzzed(json.buzzed_player);
    setNeedWager(
      json.state_type === "FinalWager" ||
        (json.state_type === "DailyDouble" && json.active_player === name)
    );
    setNeedResponse(json.state_type === "FinalClue");
    setState(json);
  };

  const handleWagerResponse = (valid: boolean, message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setToastVariant(valid ? "bg-success" : "bg-danger");
  };

  const socket = usePlayerSocket({
    name,
    gameNum,
    handleState: showState,
    handleWagerResponse,
  });

  if (!socket.isConnected) {
    return <LoadingState title={`Connecting to game #${gameNum}`} />;
  }

  return (
    <GameStateContext.Provider value={state}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
        className="center container"
      >
        <PlayerName name={name} />
        <p className="normal font-weight-normal">{clue}</p>
        <p className="normal font-weight-bold">{answer}</p>
        <Toast
          onClose={() => {
            setShowToast(false);
            setToastMessage("");
          }}
          show={showToast}
          delay={3000}
          className={toastVariant}
          autohide
        >
          <Toast.Body style={{ height: "fit-content" }}>
            <strong>{toastMessage}</strong>
          </Toast.Body>
        </Toast>
        {!needWager && !needResponse && (
          <Button
            variant="primary"
            style={{ width: "100%", flexGrow: 1 }}
            onClick={socket.buzz}
          >
            Buzz
          </Button>
        )}
        {needWager && (
          <Input
            wager
            title="Wager"
            hint="Amount"
            onSubmit={(wager) => socket.submitWager(parseInt(wager))}
          />
        )}
        {needResponse && (
          <Input
            title="Response"
            hint="Response"
            onSubmit={socket.submitResponse}
          />
        )}
      </div>
    </GameStateContext.Provider>
  );
};

type InputProps = {
  title: string;
  hint: string;
  wager?: boolean;
  onSubmit: (input: string) => void;
};

const Input = ({ title, hint, wager = false, onSubmit }: InputProps) => {
  const [input, setInput] = React.useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(input);
      }}
    >
      <Form.Label>{title}</Form.Label>
      <Form.Control
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        type={wager ? "number" : undefined}
        placeholder={hint}
      />
      <Button type="submit" variant="success" className="bottom">
        Submit
      </Button>
    </Form>
  );
};

export default Play;
