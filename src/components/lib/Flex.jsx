import React from "react";

export const Flex = (props) => {
  return <div style={{ ...props, display: "flex" }}>{props.children}</div>;
};
