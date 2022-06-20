import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil } from "@fortawesome/free-solid-svg-icons";
import { Flex } from "components/lib/Flex";
import "./player-balance.scss";

const BLOCK = "board_player-balance";

export const PlayerBalance = ({
  balance,
  onBalanceChanged,
}: {
  balance: number;
  onBalanceChanged: (num: number) => void;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newBalance, setNewBalance] = React.useState(balance.toString());

  const textInputToNewBalance = React.useCallback(
    (input: string) => {
      if (input === "-" || input === "" || parseInt(input)) {
        setNewBalance(input);
      }
    },
    [setNewBalance]
  );

  const submitNewBalance = () => {
    if (!parseInt(newBalance)) {
      cancelEditing();
    } else {
      onBalanceChanged(parseInt(newBalance));
      setIsEditing(false);
    }
  };

  const cancelEditing = () => {
    setNewBalance(balance.toString());
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <Flex direction="row" gap="4px">
        <input
          autoFocus
          value={newBalance}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitNewBalance();
            } else if (e.key === "Escape") {
              e.preventDefault();
              cancelEditing();
            }
          }}
          onChange={(e) => textInputToNewBalance(e.target.value)}
          className={BLOCK}
        />
        <button className={BLOCK} onClick={submitNewBalance}>
          <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
        </button>
      </Flex>
    );
  }

  return (
    <Flex className={BLOCK} direction="row" justify="space-between">
      <p className={BLOCK}>{balance}</p>
      <button
        className={BLOCK}
        onClick={() => {
          setNewBalance(balance.toString());
          setIsEditing(true);
        }}
      >
        <FontAwesomeIcon icon={faPencil} />
      </button>
    </Flex>
  );
};
