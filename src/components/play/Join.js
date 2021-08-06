import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

const Join = (props) => {
  return (
    <Form onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit();
    }}>
      {props.error && <Alert variant="danger">{props.error}</Alert>}
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          required
          onChange={(e) => { props.onNameChange(e.target.value) }}
          value={props.name}
          type="text"
          placeholder="Name"
        />
        <Form.Text
          className="text-muted">Name should not contain spaces or non-alphanumeric characters.
        </Form.Text>
        <Form.Control.Feedback>Invalid Name</Form.Control.Feedback>
      </Form.Group>
      <Button variant="success" type="submit">Connect</Button>
    </Form>
  )
}

export default Join;
