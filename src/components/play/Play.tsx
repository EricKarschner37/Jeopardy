import { GameState } from "components/play/play.types";
import * as React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { usePlayerSocket } from "../../util/playerSocket";
import { LoadingState } from "../lib/LoadingState";

type PlayProps = {
  name: string;
  gameNum: string;
};

const Play = ({ name, gameNum }: PlayProps) => {
  const [clue, setClue] = React.useState("Welcome to Jeopardy!");
  const [answer, setAnswer] = React.useState("");
  const [buzzed, setBuzzed] = React.useState(false);
  const [needWager, setNeedWager] = React.useState(false);
  const [needResponse, setNeedResponse] = React.useState(false);

  const showState = (json: GameState) => {
    setClue(
      json.name === "daily_double"
        ? "Daily Double!"
        : json.name === "final"
        ? json.category
        : json.clue
    );
    setAnswer(
      json.name === "response" || json.name === "board" ? json.response : ""
    );
    setBuzzed(json.name === "clue" && json.selected_player === name);
    setNeedWager(
      json.name === "final" ||
        (json.name === "daily_double" && json.selected_player === name)
    );
    setNeedResponse(json.name === "final_clue");
  };

  const socket = usePlayerSocket({ name, gameNum, handleState: showState });

  if (!socket.isConnected) {
    return <LoadingState title={`Connecting to game #${gameNum}`} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
      className="center container"
    >
      <div className={buzzed ? "buzzed" : undefined}>
        <h1 className="name text-weight-bold">{name}</h1>
        <p className="normal font-weight-normal">{clue}</p>
        <p className="normal font-weight-bold">{answer}</p>
      </div>
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
