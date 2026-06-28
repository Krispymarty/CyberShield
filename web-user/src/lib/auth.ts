const TOKEN_KEY = "sentinel_token";
const USER_KEY = "sentinel_user";

export type AuthUser = {
  user_id: string;
  full_name: string;
  email: string;
  trust_score: number;
  risk_level: string;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  access_token: string;
  user: AuthUser;
  fraud_signals: string[];
  issued_at: string;
};

export function saveAuth(auth: AuthResponse) {
  localStorage.setItem(TOKEN_KEY, auth.access_token);
  localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function getUserId() {
  return getUser()?.user_id ?? "";
}

export function isAuthenticated() {
  return Boolean(getToken());
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = "/login";
}