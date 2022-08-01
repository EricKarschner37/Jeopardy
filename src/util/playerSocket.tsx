import * as React from "react";
import { GameState } from "components/play/play.types";
import useSocket from "util/use-socket";
import { Socket } from "util/sockets.types";

export type PlayerSocket = Socket & {
  buzz: () => void;
  submitWager: (amount: number) => void;
  submitResponse: (response: string) => void;
};

export const usePlayerSocket = ({
  name,
  gameNum,
  handleState,
}: {
  name: string;
  gameNum: string | number;
  handleState: (state: GameState) => void;
}): PlayerSocket => {
  const url = React.useMemo(
    () =>
      `wss://${process.env.REACT_APP_WEBSOCKET_SERVER}/ws/${gameNum}/buzzer`,
    [gameNum]
  );
  const socket = useSocket({
    url,
    onConnect: (socket) => {
      const data = { request: "register", name: name };
      socket.send(JSON.stringify(data));
    },
    onMessage: (e: MessageEvent) => handleState(JSON.parse(e.data)),
  });

  return {
    ...socket,
    buzz: () => socket.sendObject({ request: "buzz" }),
    submitWager: (amount: number) =>
      socket.sendObject({ request: "wager", amount }),
    submitResponse: (response: string) =>
      socket.sendObject({ request: "response", response }),
  };
};
