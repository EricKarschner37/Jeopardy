import * as React from "react";
import { SocketPayload, SocketProps } from "util/sockets.types";

export default function useSocket({
  url,
  enabled = true,
  onConnect = () => {},
  onMessage = () => {},
}: SocketProps) {
  const [queuedRequests, setQueuedRequests] = React.useState<SocketPayload[]>(
    []
  );
  const socket = React.useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);

  const queueSend = (payload: SocketPayload) =>
    setQueuedRequests([...queuedRequests, payload]);

  React.useEffect(() => {
    if (enabled && !isConnected) {
      const sock = new WebSocket(url);
      sock.onmessage = onMessage;
      sock.onopen = () => {
        setIsConnected(true);
        onConnect(sock);
      };
      sock.onclose = () => {
        setIsConnected(false);
      };

      socket.current = sock;
    }
  }, [url, enabled, isConnected]);

  const sendObject = React.useCallback(
    (obj: SocketPayload) =>
      isConnected ? socket.current?.send(JSON.stringify(obj)) : queueSend(obj),
    [isConnected, socket.current?.send]
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
