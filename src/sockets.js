import { useState, useEffect } from 'react';

export default function useSocket(url, connect, onConnect = (socket) => {}) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (connect) {
      console.log(`WebSocket: Connect ${url}`)

      let socket = new WebSocket(url)
      socket.onopen = function(event) {
        onConnect(socket)
        console.log("Websocket: Connected")
      }
      setSocket(socket)

      return () => {
        socket.close()
        setSocket(null)
      }
    }
  }, [connect])

  return socket
}
