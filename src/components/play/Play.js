import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { usePlayerSocket } from "../../util/playerSocket";
import { LoadingState } from "../lib/LoadingState";

const Play = (props) => {
  const [clue, setClue] = useState("Welcome to Jeopardy!");
  const [answer, setAnswer] = useState("");
  const [buzzed, setBuzzed] = useState(false);
  const [needWager, setNeedWager] = useState(false);
  const [needResponse, setNeedResponse] = useState(false);

  const showState = (json) => {
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
    setBuzzed(json.name === "clue" && json.selected_player === props.name);
    setNeedWager(
      json.name === "final" ||
        (json.name === "daily_double" && json.selected_player === props.name)
    );
    setNeedResponse(json.name === "final_clue");
  };

  const handleState = (state) => showState(JSON.parse(state));

  const socket = usePlayerSocket(props.name, props.gameNum, handleState);

  if (!socket.connected) {
    return <LoadingState title={`Connecting to game #${props.gameNum}`} />;
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
      <div className={buzzed && "buzzed"}>
        <h1 className="name text-weight-bold">{props.name}</h1>
        <p className="normal font-weight-normal">{clue}</p>
        <p className="normal font-weight-bold">{answer}</p>
      </div>
      {!needWager && !needResponse && (
        <Button
          variant="primary"
          style={{ width: "100%", flexGrow: "1" }}
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
          onSubmit={socket.submitWager}
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

const Input = (props) => {
  const [input, setInput] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(input);
      }}
    >
      <Form.Label>{props.title}</Form.Label>
      <Form.Control
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        type={props.wager && "number"}
        placeholder={props.hint}
      />
      <Button type="submit" variant="success" className="bottom">
        Submit
      </Button>
    </Form>
  );
};

export default Play;
