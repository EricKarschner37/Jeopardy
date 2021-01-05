import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Wager = (props) => {
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group controlId="amount">
        <Form.Label>Wager</Form.Label>
        <Form.Control onChange={props.onChange} value={props.wager} type="number" placeholder="Amount" />
      </Form.Group>
      <Button type="submit" variant="success">Submit</Button>
    </Form>
  )
}

export default Wager;
