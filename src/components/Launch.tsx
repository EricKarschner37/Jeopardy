import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { LoadingState } from "../components/lib/LoadingState";

const Launch = ({ error }: { error?: string }) => {
  const [num, setNum] = useState("");
  const [isLaunching, setIsLaunching] = useState(false);

  const startGame = () => {
    const url = `http://${process.env.REACT_APP_WEBSOCKET_SERVER}/api/start/${num}`;
    console.log(url);
    setIsLaunching(true);
    fetch(url, {
      method: "POST",
    })
      .then((response) => {
        console.log(response.body);
        return response;
      })
      .then((response) => response.json())
      .then((json) =>
        window.location.assign(
          `${window.location.protocol}//${window.location.host}/${json["game_idx"]}/board`
        )
      );
  };

  if (isLaunching) {
    return <LoadingState title={`Fetching game #${num}`} />;
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        startGame();
      }}
    >
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="number">
        <Form.Label>Game Number</Form.Label>
        <Form.Control
          required
          onChange={(e) => setNum(e.target.value)}
          value={num}
          type="number"
          placeholder="Number"
        />
      </Form.Group>
      <Button variant="success" type="submit">
        Launch
      </Button>
    </Form>
  );
};

export default Launch;
