import { storage } from './storage';

export interface SecurityLog {
  id: string;
  type: 'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'BIOMETRIC_SUCCESS' | 'BIOMETRIC_FAILURE' | 'DEVICE_CHANGE' | 'SETTINGS_CHANGE';
  timestamp: string;
  details: string;
}

const LOGS_STORAGE_KEY = 'sentinel_security_logs';
const MAX_LOGS = 20;

export const securityLogsService = {
  async getLogs(): Promise<SecurityLog[]> {
    try {
      const logsStr = await storage.getItemAsync(LOGS_STORAGE_KEY);
      if (logsStr) {
        return JSON.parse(logsStr);
      }
      return [];
    } catch {
      return [];
    }
  },

  async recordLog(type: SecurityLog['type'], details: string): Promise<void> {
    try {
      const logs = await this.getLogs();
      const newLog: SecurityLog = {
        id: Math.random().toString(36).substring(2, 9),
        type,
        timestamp: new Date().toISOString(),
        details,
      };
      const updatedLogs = [newLog, ...logs].slice(0, MAX_LOGS);
      await storage.setItemAsync(LOGS_STORAGE_KEY, JSON.stringify(updatedLogs));
    } catch (error) {
      console.warn('Error recording log:', error);
    }
  },
  
  async clearLogs(): Promise<void> {
    await storage.deleteItemAsync(LOGS_STORAGE_KEY);
  }
};
