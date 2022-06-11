import * as React from "react";

export default function useSocket(
  url,
  enabled = true,
  onConnect = () => {},
  onMessage
) {
  const [queuedRequests, setQueuedRequests] = React.useState([]);
  const socket = React.useRef(null);
  const [isConnected, setIsConnected] = React.useState(false);

  const queueSend = (msg) => setQueuedRequests([...queuedRequests, msg]);

  React.useEffect(() => {
    console.log("should only appear once");
    if (enabled && !isConnected) {
      socket.current = new WebSocket(url);
      socket.current.onmessage = onMessage;
      socket.current.onopen = () => {
        setIsConnected(true);
        onConnect(socket);
      };
      socket.current.onclose = () => {
        setIsConnected(false);
      };
    }
  }, [url, enabled, isConnected]);

  console.log(socket.current?.readyState);

  const sendObject = React.useMemo(
    () =>
      isConnected
        ? (obj) => socket.current.send(JSON.stringify(obj))
        : (obj) => queueSend(JSON.stringify(obj)),
    [isConnected, socket.current.send]
  );

  React.useEffect(() => {
    if (isConnected && queuedRequests.length > 0) {
      sendObject(queuedRequests[0]);
      setQueuedRequests(queuedRequests.slice(1));
    }
  }, [queuedRequests, isConnected]);

  console.log(isConnected);

  return React.useMemo(
    () => ({
      sendObject,
      isConnected,
    }),
    [sendObject, isConnected]
  );
}
