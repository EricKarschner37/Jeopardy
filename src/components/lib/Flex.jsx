import React from "react";

export const Flex = ({
  direction = "column",
  justify,
  align: alignItems,
  children,
  ...rest
}) => {
  return (
    <div
      style={{
        ...rest,
        display: "flex",
        justifyItems: justify,
        alginContent: alignItems,
        flexDirection: direction,
      }}
    >
      {children}
    </div>
  );
};
