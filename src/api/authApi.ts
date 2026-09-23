import type { AuthUser } from "../types/types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "/api";

interface ApiErrorBody {
  message?: string;
  fields?: Record<string, string[]>;
}

interface AuthResponse {
  user: AuthUser;
}

export class AuthApiError extends Error {
  status: number;
  fields?: Record<string, string[]>;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message ?? "Something went wrong. Please try again.");
    this.name = "AuthApiError";
    this.status = status;
    this.fields = body.fields;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (init?.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers,
  });
  const body = (await response.json().catch(() => ({}))) as ApiErrorBody & T;
  if (!response.ok) throw new AuthApiError(response.status, body);
  return body;
}

export function register(payload: { username: string; email: string; password: string }) {
  return request<AuthResponse>("/auth/register", { method: "POST", body: JSON.stringify(payload) });
}

export function login(payload: { email: string; password: string }) {
  return request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(payload) });
}

export function getCurrentUser() {
  return request<AuthResponse>("/auth/me");
}

export function refreshSession() {
  return request<AuthResponse>("/auth/refresh", { method: "POST" });
}

export function logout() {
  return request<void>("/auth/logout", { method: "POST" });
}
