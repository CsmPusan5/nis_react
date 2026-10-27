import type { Message } from "../types";

const WS_URL = import.meta.env?.VITE_WS_URL || "ws://localhost:3001";

type SocketCallbacks = {
  onMessage?: (message: Message) => void;
  onStatus?: (status: string) => void;
};

export function connectSocket(token: string, { onMessage, onStatus }: SocketCallbacks) {
  const ws = new WebSocket(WS_URL);

  ws.onopen = () => onStatus?.("connected");
  ws.onclose = () => onStatus?.("disconnected");
  ws.onerror = () => onStatus?.("disconnected");
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data?.type === "message:new") {
        onMessage?.(data.payload as Message);
      }
    } catch {
      /* ignore */
    }
  };

  return {
    sendMessage(text: string) {
      if (ws.readyState !== WebSocket.OPEN) return;
      ws.send(JSON.stringify({ type: "message:send", payload: { text, token } }));
    },
    disconnect() {
      ws.close();
    },
  };
}