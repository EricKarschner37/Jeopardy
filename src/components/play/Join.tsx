import * as React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Flex } from "../lib/Flex";
import { LoadingState } from "../lib/LoadingState";

export const Join = () => {
  const [games, setGames] = React.useState<number[]>([]);
  const [gamesIsLoading, setGamesIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(`https://${process.env.REACT_APP_WEBSOCKET_SERVER}/api/games`)
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setGamesIsLoading(false);
      });
  }, []);

  games.forEach((game) => console.log(typeof game));

  const buttons = games
    .sort((a, b) => b - a)
    .map((game) => (
      <Link key={game} style={{ marginBottom: "4dp" }} to={`/${game}/play`}>
        <Button>Game #{game}</Button>
      </Link>
    ));

  if (gamesIsLoading) {
    return <LoadingState title="Loading games" />;
  }

  return (
    <Flex direction="column" align="flex-start">
      <h3>Choose the Game Number from the board</h3>
      <p style={{ color: "grey", fontSize: "12px" }}>
        Don&apos;t have a game number? No problem! Just ask your host
      </p>
      {buttons}
    </Flex>
  );
};

export const Register = ({
  error,
  onSubmit,
  onNameChange,
  name,
}: {
  error?: string;
  onSubmit: () => void;
  onNameChange: (name: string) => void;
  name: string;
}) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          onChange={(e) => {
            onNameChange(e.target.value);
          }}
          value={name}
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
