import { Spinner } from "react-bootstrap";
import { Flex } from "./Flex";
import * as React from "react";

export const LoadingState = ({ title, description }) => (
  <Flex direction="column" alignItems="center">
    <h3>{title}</h3>
    <p style={{ color: "grey", fontSize: "12px" }}>{description}</p>
    <Spinner animation="border" role="status" />
  </Flex>
);
