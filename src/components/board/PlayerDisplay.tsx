import { faCheck, faPencil, faX } from "@fortawesome/free-solid-svg-icons";
import { PlayerData } from "components/play/play.types";
import React from "react";
import { Socket } from "util/sockets.types";
import "./player-display.scss";
import { Table, TableColumn } from "components/lib/Table";

type PlayerDisplayProps = {
  socket: Socket;
  players: PlayerData[];
};

const isValidBalance = (bal: string) => !isNaN(parseInt(bal));

const isValidBalanceDuringEditing = (bal: string) =>
  bal === "" || bal === "-" || isValidBalance(bal);

const BLOCK = "board_player-display";

const playerNameColumn: TableColumn<PlayerData, string> = {
  displayName: "Player",
  accessor: (player: PlayerData) => player.name,
  width: "50%",
};

export const PlayerDisplay = ({ socket, players }: PlayerDisplayProps) => {
  console.log(JSON.stringify(players));
  const removePlayer = React.useCallback(
    (player: string) => {
      const data = {
        request: "remove",
        player,
      };

      socket.sendObject(data);
    },
    [socket]
  );

  const [playerBeingEdited, setPlayerBeingEdited] = React.useState<
    string | null
  >(null);
  const [balanceBeingEdited, setBalanceBeingEdited] = React.useState<
    string | null
  >(null);

  const setPlayerBalance = React.useCallback(
    ({ name, balance }: Pick<PlayerData, "name" | "balance">) => {
      const data = {
        request: "set_player_balance",
        amount: balance,
        player: name,
      };

      socket.sendObject(data);
    },
    [socket]
  );

  const submitNewPlayerBalance = React.useCallback(() => {
    if (balanceBeingEdited && isValidBalance(balanceBeingEdited)) {
      setPlayerBalance({
        name: playerBeingEdited!,
        balance: parseInt(balanceBeingEdited),
      });
    }
    setPlayerBeingEdited(null);
    setBalanceBeingEdited(null);
  }, [
    balanceBeingEdited,
    playerBeingEdited,
    setBalanceBeingEdited,
    setPlayerBeingEdited,
    setPlayerBalance,
  ]);

  const playerBalanceColumn: TableColumn<PlayerData, number> = React.useMemo(
    () => ({
      displayName: "Balance",
      accessor: (player: PlayerData) => player.balance,
      render: (player: PlayerData) => {
        if (player.name === playerBeingEdited) {
          return (
            <input
              autoFocus
              value={balanceBeingEdited ?? ""}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitNewPlayerBalance();
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  setPlayerBeingEdited(null);
                  setBalanceBeingEdited(null);
                }
              }}
              onChange={(e) => {
                if (isValidBalanceDuringEditing(e.target.value)) {
                  setBalanceBeingEdited(e.target.value);
                }
              }}
              className={`${BLOCK}--edit-balance`}
            />
          );
        } else {
          return player.balance.toString();
        }
      },
    }),
    [
      submitNewPlayerBalance,
      playerBeingEdited,
      balanceBeingEdited,
      setPlayerBeingEdited,
      setBalanceBeingEdited,
    ]
  );

  const getActionButtons = React.useCallback(
    ({ name, balance }: PlayerData) => [
      ...(!playerBeingEdited
        ? [
            {
              iconProps: { icon: faPencil },
              onClick: () => {
                setPlayerBeingEdited(name);
                setBalanceBeingEdited(balance.toString());
              },
            },
            {
              iconProps: { icon: faX },
              onClick: () => {
                removePlayer(name);
              },
            },
          ]
        : name === playerBeingEdited
        ? [
            {
              iconProps: { icon: faCheck },
              onClick: () => {
                submitNewPlayerBalance();
              },
            },
          ]
        : []),
    ],
    [
      removePlayer,
      playerBeingEdited,
      setPlayerBeingEdited,
      submitNewPlayerBalance,
    ]
  );

  return (
    <div style={{ height: "min-content", width: "30%" }}>
      <Table
        columns={[playerNameColumn, playerBalanceColumn]}
        rows={players}
        getActionButtons={getActionButtons}
      />
    </div>
  );
};

export default PlayerDisplay;
