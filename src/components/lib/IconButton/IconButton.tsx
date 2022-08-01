import * as React from "react";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

const BLOCK = "lib_button";

export type IconButtonProps = {
  iconProps: FontAwesomeIconProps;
  variant?: "primary" | "secondary" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  onClick: (e: React.MouseEvent) => void;
};

export const IconButton = ({
  variant = "primary",
  size = "md",
  onClick,
  iconProps,
}: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${BLOCK} ${BLOCK}-${variant} ${BLOCK}-${size}`}
    >
      <FontAwesomeIcon {...iconProps} />
    </button>
  );
};
