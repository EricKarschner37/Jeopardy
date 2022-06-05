import * as React from "react";

export default function useSocket(url, enabled = true, onConnect = () => {}, onMessage) {
  const [queuedRequests, setQueuedRequests] = React.useState([]);

  const queueSend = (msg) => setQueuedRequests([...queuedRequests, msg]);

  const socket = React.useMemo(() => {
    if (enabled) {
      const sock = new WebSocket(url);
      sock.onmessage = onMessage;
      sock.onopen = () => {
        onConnect(socket);
      };
      return sock;
    } else {
      return null;
    }
  }, [url, enabled]);

  const connected = React.useMemo(() => socket?.readyState === 1, [socket?.readyState]);
  const sendObject = React.useMemo(() => connected ? (obj) =>
    socket.send(JSON.stringify(obj)) : (obj) => queueSend(JSON.stringify(obj)),
    [connected, socket.send]
  );

  React.useEffect(() => {
    if (connected && queuedRequests.length > 0) {
      sendObject(queuedRequests[0])
      setQueuedRequests(queuedRequests.slice(1))
    }
  }, [queuedRequests, connected]);

  console.log(JSON.stringify(socket));
  console.log(connected);

  return React.useMemo(() => ({
      sendObject,
      connected
    }),[sendObject, connected]
  );
}
