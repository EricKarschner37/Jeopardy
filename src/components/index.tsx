import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Flex } from "./lib/Flex";

const Index = () => {
  return (
    <Flex flexDirection="column">
      <h3>Welcome to Jeopardy!</h3>
      <Flex justifyContent="space-evenly">
        <Link to="/play">
          <Button>Join a game</Button>
        </Link>
        <h5>Or</h5>
        <Link to="/board">
          <Button>Host a game</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Index;
