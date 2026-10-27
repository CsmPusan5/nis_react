import axios from "axios";
import type { User } from "../types";

const API_URL = import.meta.env?.VITE_API_URL || "http://localhost:3001";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function getProfile(token: string): Promise<User> {
  const res = await fetch(`${API_URL}/users/me`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return (await res.json()) as User;
}

export type UpdateProfilePayload = Partial<Pick<User, "nickname" | "bio">>;

export async function updateProfile(
  token: string,
  { nickname, bio }: UpdateProfilePayload,
): Promise<User> {
  const { data } = await axios.put<User>(
    `${API_URL}/users/me`,
    { nickname, bio },
    { headers: authHeaders(token) },
  );
  return data;
}