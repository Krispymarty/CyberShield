import { Platform } from 'react-native';
import { storage } from './storage';

export interface DeviceInfo {
  deviceId: string;
  isFirstLogin: boolean;
  isTrusted: boolean;
  trustScore: number;
}

const DEVICE_INFO_KEY = 'sentinel_device_info';

export const deviceTrustService = {
  async getDeviceInfo(): Promise<DeviceInfo> {
    try {
      const infoStr = await storage.getItemAsync(DEVICE_INFO_KEY);
      
      if (infoStr) {
        const info = JSON.parse(infoStr);
        return { ...info, isFirstLogin: false };
      }
      
      // Generate a random device ID
      const deviceId = Platform.OS + '_' + Math.random().toString(36).substring(2, 11);
        
      const newDeviceInfo: DeviceInfo = {
        deviceId,
        isFirstLogin: true,
        isTrusted: false,
        trustScore: 50,
      };
      
      await storage.setItemAsync(DEVICE_INFO_KEY, JSON.stringify({
        ...newDeviceInfo,
        isFirstLogin: false,
      }));
      
      return newDeviceInfo;
    } catch {
      return {
        deviceId: 'fallback_id',
        isFirstLogin: true,
        isTrusted: false,
        trustScore: 0,
      };
    }
  },

  async markAsTrusted(): Promise<void> {
    try {
      const info = await this.getDeviceInfo();
      await storage.setItemAsync(DEVICE_INFO_KEY, JSON.stringify({
        ...info, isTrusted: true, trustScore: 100,
      }));
    } catch {}
  },
  
  async revokeTrust(): Promise<void> {
    try {
      const info = await this.getDeviceInfo();
      await storage.setItemAsync(DEVICE_INFO_KEY, JSON.stringify({
        ...info, isTrusted: false, trustScore: 20,
      }));
    } catch {}
  }
};
