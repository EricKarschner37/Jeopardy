import { useState, useEffect } from "react";

export default function useSocket(url, enabled = true, onConnect = () => {}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (enabled && (!socket || socket.readyState === 3)) {
      console.log(`WebSocket: Connect ${url}`);

      const socket = new WebSocket(url);
      socket.onopen = function () {
        onConnect(socket);
        console.log("Websocket: Connected");
      };
      setSocket(socket);
    }
    return () => {
      socket?.close();
      setSocket(null);
    };
  }, [enabled, socket]);

  return socket;
}
