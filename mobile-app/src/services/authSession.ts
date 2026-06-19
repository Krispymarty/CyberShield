import { storage } from './storage';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  userId: string;
  fullName?: string;
  email?: string;
  phone?: string;
}

const SESSION_STORAGE_KEY = 'sentinel_auth_session';

export const authSessionService = {
  async saveSession(session: AuthSession): Promise<void> {
    await storage.setItemAsync(SESSION_STORAGE_KEY, JSON.stringify(session));
  },

  async loadSession(): Promise<AuthSession | null> {
    try {
      const sessionStr = await storage.getItemAsync(SESSION_STORAGE_KEY);
      if (sessionStr) {
        return JSON.parse(sessionStr);
      }
      return null;
    } catch {
      return null;
    }
  },

  async clearSession(): Promise<void> {
    await storage.deleteItemAsync(SESSION_STORAGE_KEY);
  },

  async isSessionValid(): Promise<boolean> {
    try {
      const session = await this.loadSession();
      if (!session) return false;
      return Date.now() < session.expiresAt;
    } catch {
      return false;
    }
  }
};
