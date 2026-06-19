import { securitySettingsService } from './securitySettings';
import { deviceTrustService } from './deviceTrust';

export interface SecurityScoreStatus {
  score: number;
  status: 'SECURE' | 'WARNING' | 'CRITICAL';
  recommendations: string[];
}

export const securityScoreService = {
  async calculateScore(): Promise<SecurityScoreStatus> {
    try {
      const settings = await securitySettingsService.getSettings();
      const deviceTrust = await deviceTrustService.getDeviceInfo();
      
      let score = 0;
      const recommendations: string[] = [];

      // Base minimum
      score += 10; 

      // Biometrics (+20)
      if (settings.biometricsEnabled) {
        score += 20;
      } else {
        recommendations.push('Enable Biometrics for faster, more secure logins');
      }

      // Passkey (+25)
      if (settings.passkeyEnabled) {
        score += 25;
      } else {
        recommendations.push('Register a Passkey for phishing-resistant security');
      }

      // Trusted Device (+15)
      if (deviceTrust.isTrusted) {
        score += 15;
      } else {
        recommendations.push('Verify this device to establish trust');
      }

      // OTP Enabled (+10)
      if (settings.otpEnabled) {
        score += 10;
      }

      // Session Protection / Auto Lock (+10)
      if (settings.autoLockEnabled) {
        score += 10;
      } else {
        recommendations.push('Enable Auto-Lock to secure your active session');
      }

      // Extra protections (+10)
      if (settings.simProtection && settings.impersonationShield) {
        score += 10;
      } else if (!settings.simProtection) {
        recommendations.push('Enable SIM Swap Protection');
      } else if (!settings.impersonationShield) {
        recommendations.push('Enable Impersonation Shield');
      }

      // Cap at 100
      score = Math.min(100, score);

      let status: SecurityScoreStatus['status'] = 'CRITICAL';
      if (score >= 80) status = 'SECURE';
      else if (score >= 50) status = 'WARNING';

      return {
        score,
        status,
        recommendations
      };
    } catch (error) {
      console.error('Error calculating security score:', error);
      return {
        score: 0,
        status: 'CRITICAL',
        recommendations: ['Unable to calculate score due to system error']
      };
    }
  }
};
