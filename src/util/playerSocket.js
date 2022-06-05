import useSocket from "./sockets";
import * as React from 'react';

export const usePlayerSocket = (name, gameNum, handleState) => {
  const url = React.useMemo(() => `wss://${process.env.REACT_APP_WEBSOCKET_SERVER}/ws/${gameNum}/buzzer`, [gameNum]);
  const socket = useSocket(url, true, (socket) => {
      const data = { request: "register", name: name };
      socket.send(JSON.stringify(data));
    }, (e) => handleState(e.data)
  );

  return {
    ...socket,
    buzz: () => socket.sendObject({ request: "buzz" }),
    submitWager: (amount) => socket.sendObject({ request: "wager", amount }),
    submitResponse: (response) => socket.sendObject({ request: "response", response }),
  };
}
