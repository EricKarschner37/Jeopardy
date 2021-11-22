import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Play = (props) => {
  const [clue, setClue] = useState("Welcome to Jeopardy!");
  const [answer, setAnswer] = useState("");
  const [buzzed, setBuzzed] = useState(false);
  const [needWager, setNeedWager] = useState(false);
  const [needResponse, setNeedResponse] = useState(false);

  const showState = (json) => {
    setClue(json.name === "daily_double" ? "Daily Double!" : json.name === "final" ? json.category : json.clue);
    setAnswer(
      json.name === "response" || json.name === "board" ? json.response : ""
    );
    setBuzzed(json.name === "clue" && json.selected_player === props.name);
    setNeedWager(
      json.name === "final" || (json.name === "daily_double" && json.selected_player === props.name)
    );
    setNeedResponse(json.name === "final_clue");
  };

  const buzz = () => {
    props.socket.send(JSON.stringify({ request: "buzz" }));
  };

  const submitWager = (wager) => {
    props.socket.send(
      JSON.stringify({ request: "wager", amount: parseInt(wager) })
    );
  };

  const submitResponse = (response) => {
    props.socket.send(
      JSON.stringify({ request: "response", response: response })
    );
  };

  props.socket.onmessage = (e) => {
    console.log(e);
    showState(JSON.parse(e.data));
  };

  return (
    <div className="center container">
      <div className={buzzed && "buzzed"}>
        <h1 className="name text-weight-bold">{props.name}</h1>
        <p className="normal font-weight-normal">{clue}</p>
        <p className="normal font-weight-bold">{answer}</p>
      </div>
      {!needWager && !needResponse && (
        <Button variant="primary" onClick={buzz}>
          Buzz
        </Button>
      )}
      {needWager && <Input wager hint="Amount" onSubmit={submitWager} />}
      {needResponse && <Input hint="Response" onSubmit={submitResponse} />}
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
      <Form.Label>Wager</Form.Label>
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
