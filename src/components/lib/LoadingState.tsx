import { Spinner } from "react-bootstrap";
import { Flex } from "./Flex";
import * as React from "react";

export type LoadingStateProps = {
  title: string;
  description?: string;
};

export const LoadingState = ({ title, description }: LoadingStateProps) => (
  <Flex direction="column" align="center">
    <h3>{title}</h3>
    {description && (
      <p style={{ color: "grey", fontSize: "12px" }}>{description}</p>
    )}
    <Spinner animation="border" role="status" />
  </Flex>
);
