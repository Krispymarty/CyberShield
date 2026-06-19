const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

export const USER_ID = "USR001";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}

export function getDashboard(userId = USER_ID) {
  return apiFetch(`/dashboard/${userId}`);
}

export function getDevices(userId = USER_ID) {
  return apiFetch(`/device/${userId}`);
}

export function getAlerts(userId = USER_ID) {
  return apiFetch(`/alerts/${userId}`);
}

export function getAdminDashboard() {
  return apiFetch(`/admin/dashboard`);
}