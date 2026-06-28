import type { AuthResponse } from "./auth";
import { getToken, getUserId } from "./auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
  const error = await res.json().catch(() => null);

  if (Array.isArray(error?.detail)) {
    const message = error.detail
      .map((item: { msg: string }) => item.msg)
      .join(", ");

    throw new Error(message);
  }

  throw new Error(error?.detail || `API error: ${res.status}`);
}

  return res.json();
}

export function login(payload: {
  email: string;
  password: string;
  device_id: string;
  ip_address: string;
  location: string;
}) {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
export function register(payload: {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  location: string;
  national_id: string;
  device_id: string;
  ip_address: string;
})
 {
  return apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getDashboard(userId = getUserId()) {
  return apiFetch(`/dashboard/${userId}`);
}

export function getDevices(userId = getUserId()) {
  return apiFetch(`/device/${userId}`);
}

export function getAlerts(userId = getUserId()) {
  return apiFetch(`/alerts/${userId}`);
}

export function getAdminDashboard() {
  return apiFetch(`/admin/dashboard`);
}