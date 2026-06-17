import { securityLogsService } from './securityLogs';

export const otpAuthService = {
  async requestOTP(phoneOrEmail: string): Promise<boolean> {
    try {
      console.log(`Mock: Sending OTP to ${phoneOrEmail}`);
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Error requesting OTP:', error);
      return false;
    }
  },

  async verifyOTP(code: string): Promise<boolean> {
    try {
      console.log(`Mock: Verifying OTP ${code}`);
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const isValid = code.length >= 4; // Mock logic: any code 4+ chars is valid
      
      if (isValid) {
        await securityLogsService.recordLog('LOGIN_SUCCESS', 'User authenticated via OTP');
      } else {
        await securityLogsService.recordLog('LOGIN_FAILURE', 'Invalid OTP provided');
      }
      
      return isValid;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return false;
    }
  }
};
