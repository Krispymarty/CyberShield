import { Platform, Alert } from 'react-native';
import { securityLogsService } from './securityLogs';

/**
 * Biometric auth service.
 * In Expo Go (without dev build), native biometric modules aren't available,
 * so we auto-succeed and log the action. In a production dev build,
 * replace the mock with actual expo-local-authentication calls.
 */

export const biometricAuthService = {
  async checkBiometricAvailability(): Promise<{ available: boolean; types: number[] }> {
    // In Expo Go without dev build, biometrics aren't available
    return { available: false, types: [] };
  },

  async isBiometricEnrolled(): Promise<boolean> {
    return false;
  },

  async authenticateUser(promptMessage: string = 'Authenticate to continue'): Promise<boolean> {
    try {
      // Mock: auto-succeed since we're running in Expo Go
      // In production dev build, this would use expo-local-authentication
      console.log(`[Biometric Mock] ${promptMessage} — auto-succeeding`);
      try {
        await securityLogsService.recordLog('BIOMETRIC_SUCCESS', 'Mock biometric auth succeeded');
      } catch {}
      return true;
    } catch (error) {
      console.warn('Biometric auth error:', error);
      return true;
    }
  },

  async enableBiometrics(): Promise<boolean> {
    const success = await this.authenticateUser('Enable Biometrics for Sentinel AI');
    if (success) {
      try { await securityLogsService.recordLog('SETTINGS_CHANGE', 'Biometrics enabled'); } catch {}
    }
    return success;
  },

  async disableBiometrics(): Promise<boolean> {
    const success = await this.authenticateUser('Verify identity to disable biometrics');
    if (success) {
      try { await securityLogsService.recordLog('SETTINGS_CHANGE', 'Biometrics disabled'); } catch {}
    }
    return success;
  }
};
