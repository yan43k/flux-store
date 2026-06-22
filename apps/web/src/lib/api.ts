import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export type AuthUserDto = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type AuthSessionDto = {
  user: AuthUserDto;
  accessToken: string;
  refreshToken: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: { code: string; message: string; details?: unknown };
  meta?: { page?: number; pageSize?: number; total?: number };
};

export function authHeaders(token: string) {
  return { Authorization: `Bearer ${token}` };
}
