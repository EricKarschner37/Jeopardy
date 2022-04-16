import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Flex } from "../lib/Flex";

export const Join = () => {
  const [games, setGames] = useState([]);
  const [gamesIsLoading, setGamesIsLoading] = useState(true);

  useEffect(() => {
    fetch(`https://${process.env.REACT_APP_WEBSOCKET_SERVER}/api/games`)
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setGamesIsLoading(false);
      });
  }, []);

  const buttons = games.sort().map((game) => (
    <>
      <Link to={`/${game}/play`}>
        <Button>Game #{game}</Button>
      </Link>
      <br />
    </>
  ));
  return (
    <Flex flexDirection="column" alignItems="flex-start">
      <h3>Choose the Game Number from the board</h3>
      <p style={{ color: "grey", fontSize: "12px" }}>
        Don&apos;t have a game number? No problem! Just ask your host
      </p>
      {gamesIsLoading ? (
        <Spinner
          style={{ alignSelf: "center" }}
          animation="border"
          role="status"
        />
      ) : (
        buttons
      )}
    </Flex>
  );
};

export const Register = (props) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit(props.game);
      }}
    >
      {props.error && <Alert variant="danger">{props.error}</Alert>}
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          onChange={(e) => {
            props.onNameChange(e.target.value);
          }}
          value={props.name}
          type="text"
          placeholder="Name"
        />
        <Form.Text className="text-muted">
          Name should not contain spaces or non-alphanumeric characters.
        </Form.Text>
        <Form.Control.Feedback>Invalid Name</Form.Control.Feedback>
      </Form.Group>
      <Button variant="success" type="submit">
        Connect
      </Button>
    </Form>
  );
};
