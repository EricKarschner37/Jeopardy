import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";

const Index = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>Welcome to Jeopardy!</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/play">
            <Button>Join a game</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Or</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to="/board">
            <Button>Host a game</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
