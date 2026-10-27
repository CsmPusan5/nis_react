import { useCallback, useEffect, useRef, useState } from "react";
import type { Message } from "../types";
import { getMessages } from "../api/messageApi";
import { connectSocket } from "../api/socketClient";
import { handleError } from "../helpers/handleError";
import { MessageList } from "../components/MessageList";
import { MessageInput } from "../components/MessageInput";

type Props = {
  token: string;
};

export function ChatPage({ token }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [socketStatus, setSocketStatus] = useState<string>("disconnected");
  const socketRef = useRef<ReturnType<typeof connectSocket> | null>(null);

  const addMessage = useCallback((incoming: Message) => {
    setMessages((prev) =>
      prev.some((m) => m.id === incoming.id) ? prev : [...prev, incoming],
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    getMessages(token)
      .then((list) => {
        if (!cancelled) setMessages(list);
      })
      .catch((e) => {
        if (!cancelled) setError(handleError(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    const client = connectSocket(token, {
      onMessage: addMessage,
      onStatus: (status) => {
        if (!cancelled) setSocketStatus(status);
      },
    });
    socketRef.current = client;

    return () => {
      cancelled = true;
      client.disconnect();
      socketRef.current = null;
    };
  }, [token, addMessage]);

  const handleSend = (text: string) => {
    setError("");
    if (socketStatus !== "connected" || !socketRef.current) {
      setError("Сокет не подключён");
      return;
    }
    try {
      socketRef.current.sendMessage(text);
    } catch (e) {
      setError(handleError(e));
    }
  };

  return (
    <div>
      <h2>Чат</h2>
      <p>Статус сокета: {socketStatus}</p>
      {loading && <p>Загрузка сообщений...</p>}
      {error ? <p style={{ color: "red" }}>{error}</p> : null}

      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} disabled={socketStatus !== "connected"} />
    </div>
  );
}

export default ChatPage;