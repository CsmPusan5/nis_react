import axios from "axios";
import type { Message } from "../types";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getMessages(token: string): Promise<Message[]> {
  const res = await fetch(`${API_URL}/messages`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as Message[];
}

export async function sendMessage(token: string, text: string): Promise<Message> {
  const { data } = await axios.post<Message>(
    `${API_URL}/messages`,
    { text },
    { headers: authHeaders(token) },
  );
  return data;
}