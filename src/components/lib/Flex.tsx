import * as React from "react";

export type FlexProps = {
  direction: "column" | "row";
  justify:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-evenly"
    | "space-between";
  align: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  children: React.ReactNode;
  isMaxWidth?: boolean;
  isMaxHeight?: boolean;
  className?: string;
} & any;

export const Flex = ({
  direction = "column",
  justify,
  align,
  children,
  isMaxHeight = false,
  isMaxWidth = false,
  className,
  ...rest
}: FlexProps) => {
  return (
    <div
      style={{
        ...(isMaxWidth ? { width: "100%" } : {}),
        ...(isMaxHeight ? { width: "100%" } : {}),
        ...rest,
        display: "flex",
        justifyContent: justify,
        alignItems: align,
        flexDirection: direction,
      }}
      className={className}
    >
      {children}
    </div>
  );
};
