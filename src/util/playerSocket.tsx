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
  handleWagerResponse,
}: {
  name: string;
  gameNum: string | number;
  handleState: (state: GameState) => void;
  handleWagerResponse: (valid: boolean, message: string) => void;
}): PlayerSocket => {
  const url = React.useMemo(
    () =>
      `wss://${process.env.REACT_APP_WEBSOCKET_SERVER}/ws/${gameNum}/buzzer`,
    [gameNum]
  );

  const onMessage = (e: MessageEvent) => {
    console.log(e.data);
    const data = JSON.parse(e.data);
    if (data.message === "state") {
      handleState(data);
    } else if (data.message === "input-response") {
      handleWagerResponse(data.valid, data.reason);
    }
  };

  const socket = useSocket({
    url,
    onConnect: (socket) => {
      const data = { request: "register", name: name };
      socket.send(JSON.stringify(data));
    },
    onMessage,
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
