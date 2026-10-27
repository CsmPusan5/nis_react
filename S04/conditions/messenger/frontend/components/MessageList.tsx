import type { Message } from "../types";

type Props = {
  messages: Message[];
};

export function MessageList({ messages }: Props) {
  if (!messages?.length) {
    return <p>Нет сообщений</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
      {messages.map((m) => (
        <div key={m.id} style={{ border: "1px solid #eee", padding: 8 }}>
          <div style={{ fontSize: 12, opacity: 0.7 }}>
            <b>{m.author}</b> · {new Date(m.createdAt).toLocaleString()}
          </div>
          <div>{m.text}</div>
        </div>
      ))}
    </div>
  );
}

export default MessageList;