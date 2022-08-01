import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Flex } from "components/lib/Flex";
import "./player-balance.scss";

const BLOCK = "board_player-balance";

export const PlayerBalance = ({
  editBalance,
  onEditBalanceChanged,
  onEditCanceled,
  onSubmit,
}: {
  editBalance: string;
  onEditBalanceChanged: (val: string) => void;
  onEditCanceled: () => void;
  onSubmit: () => void;
}) => {
  return (
    <Flex direction="row" gap="4px" align="center">
      <input
        autoFocus
        value={editBalance}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
          } else if (e.key === "Escape") {
            e.preventDefault();
            onEditCanceled();
          }
        }}
        onChange={(e) => onEditBalanceChanged(e.target.value)}
        className={BLOCK}
      />
      <button className={BLOCK} onClick={onSubmit}>
        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
      </button>
    </Flex>
  );
};
