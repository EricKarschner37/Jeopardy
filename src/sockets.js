import { useState, useEffect } from "react";

export default function useSocket(url, connect = true, onConnect = () => {}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (connect) {
      console.log(`WebSocket: Connect ${url}`);

      const socket = new WebSocket(url);
      socket.onopen = function () {
        onConnect(socket);
        console.log("Websocket: Connected");
      };
      setSocket(socket);

      return () => {
        socket.close();
        setSocket(null);
      };
    }
  }, [connect]);

  return socket;
}
