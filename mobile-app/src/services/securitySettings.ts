import { storage } from './storage';

export interface SecuritySettings {
  biometricsEnabled: boolean;
  passkeyEnabled: boolean;
  otpEnabled: boolean;
  trustedDevice: boolean;
  autoLockEnabled: boolean;
  simProtection: boolean;
  impersonationShield: boolean;
}

const DEFAULT_SETTINGS: SecuritySettings = {
  biometricsEnabled: false,
  passkeyEnabled: false,
  otpEnabled: true,
  trustedDevice: true,
  autoLockEnabled: true,
  simProtection: true,
  impersonationShield: true,
};

const SETTINGS_STORAGE_KEY = 'sentinel_security_settings';

export const securitySettingsService = {
  async getSettings(): Promise<SecuritySettings> {
    try {
      const settingsStr = await storage.getItemAsync(SETTINGS_STORAGE_KEY);
      if (settingsStr) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(settingsStr) };
      }
      return DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  async updateSettings(newSettings: Partial<SecuritySettings>): Promise<SecuritySettings> {
    try {
      const currentSettings = await this.getSettings();
      const updatedSettings = { ...currentSettings, ...newSettings };
      await storage.setItemAsync(SETTINGS_STORAGE_KEY, JSON.stringify(updatedSettings));
      return updatedSettings;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },
  
  async resetSettings(): Promise<void> {
    await storage.deleteItemAsync(SETTINGS_STORAGE_KEY);
  }
};
