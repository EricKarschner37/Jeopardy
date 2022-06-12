export type SocketPayload = Record<string, string | number>;

export type SocketProps = {
  url: string;
  enabled?: boolean;
  onConnect?: (s: WebSocket) => void;
  onMessage?: (e: MessageEvent) => void;
};

export type Socket = {
  isConnected: boolean;
  sendObject: (obj: SocketPayload) => void;
};
