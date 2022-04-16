import { useState, useEffect } from "react";

export default function useSocket(url, enabled = true, onConnect = () => {}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (enabled && (!socket || socket.readyState === 3)) {
      console.log(`WebSocket: Connect ${url}`);

      const socket = new WebSocket(url);
      socket.onopen = function () {
        console.log("Websocket: Connected");
        onConnect(socket);
      };
      setSocket(socket);
    }
  }, [enabled, socket?.readyState]);

  return socket;
}
