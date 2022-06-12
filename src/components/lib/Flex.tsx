import * as React from "react";

export type FlexProps = {
  direction: "column" | "row";
  justify: "flex-start" | "flex-end" | "center";
  align: "flex-start" | "flex-end" | "center";
  children: React.ReactNode;
} & any;

export const Flex = ({
  direction = "column",
  justify,
  align: alignItems,
  children,
  ...rest
}: FlexProps) => {
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
