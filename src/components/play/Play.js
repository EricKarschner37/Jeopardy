import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Play = (props) => {
  const [clue, setClue] = useState("Welcome to Jeopardy!");
  const [answer, setAnswer] = useState("");
  const [buzzed, setBuzzed] = useState(false);
  const [needWager, setNeedWager] = useState(false);

  const showState = (json) => {
    setClue(json.name === "daily_double" ? "Daily Double!" : json.clue);
    setAnswer(
      json.name === "response" || json.name === "board" ? json.response : ""
    );
    setBuzzed(json.name === "clue" && json.selected_player === props.name);
    setNeedWager(
      json.name === "daily_double" && json.selected_player === props.name
    );
    //    setNeedWager(needWager || (json.name === 'final'))
  };

  const buzz = () => {
    props.socket.send(JSON.stringify({ request: "buzz" }));
  };

  const submitWager = (wager) => {
    props.socket.send(
      JSON.stringify({ request: "wager", amount: parseInt(wager) })
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
      {!needWager && (
        <Button variant="primary" onClick={buzz}>
          Buzz
        </Button>
      )}
      {needWager && <Wager onSubmit={submitWager} />}
    </div>
  );
};

const Wager = (props) => {
  const [wager, setWager] = useState("");

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(wager);
      }}
    >
      <Form.Label>Wager</Form.Label>
      <Form.Control
        onChange={(e) => {
          setWager(e.target.value);
        }}
        value={wager}
        type="number"
        placeholder="Amount"
      />
      <Button type="submit" variant="success" className="bottom">
        Submit
      </Button>
    </Form>
  );
};

export default Play;
