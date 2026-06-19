import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { authSessionService } from '../services/authSession';
import { securityLogsService } from '../services/securityLogs';
import { biometricAuthService } from '../services/biometricAuth';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email?: string, password?: string) => Promise<boolean>;
  loginBiometric: () => Promise<boolean>;
  loginPasskey: () => Promise<boolean>;
  register: (fullName: string, email: string, phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => Promise<void>;
  requireBiometricUnlock: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const registeredDataRef = useRef<{fullName: string; email: string; phone: string} | null>(null);

  const checkSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const isValid = await authSessionService.isSessionValid();
      if (isValid) {
        const session = await authSessionService.loadSession();
        setUser({
          id: session?.userId || '1',
          fullName: session?.fullName || 'Alex Morgan',
          email: session?.email || 'alex@example.com',
          phone: session?.phone || '+1 (555) 000-0000',
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Session check failed', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const createSessionAndUser = useCallback(async () => {
    // If there is existing data in the register ref, use that, otherwise use defaults or existing session
    const existingSession = await authSessionService.loadSession();
    
    const fullName = registeredDataRef.current?.fullName || existingSession?.fullName || 'Alex Morgan';
    const email = registeredDataRef.current?.email || existingSession?.email || 'alex@example.com';
    const phone = registeredDataRef.current?.phone || existingSession?.phone || '+1 (555) 000-0000';

    try {
      await authSessionService.saveSession({
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
        userId: '1',
        fullName,
        email,
        phone
      });
    } catch (error) {
      console.warn('Failed to save session:', error);
    }
    setUser({
      id: '1',
      fullName,
      email,
      phone,
    });
  }, []);

  const login = useCallback(async (email?: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!email || !password) {
        // Fallback for biometric/passkey or when email/pass aren't provided
        await createSessionAndUser();
        return true;
      }

      const response = await fetch('http://192.168.1.11:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Login error from server:', data.message);
        return false;
      }

      // If successful, save to session
      await authSessionService.saveSession({
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token',
        expiresAt: Date.now() + 1000 * 60 * 60 * 24,
        userId: data.user.id,
        fullName: data.user.fullName,
        email: data.user.email,
        phone: data.user.phone
      });

      setUser({
        id: data.user.id,
        fullName: data.user.fullName,
        email: data.user.email,
        phone: data.user.phone,
      });

      try {
        await securityLogsService.recordLog('LOGIN_SUCCESS', 'Standard login');
      } catch (_) { /* ignore log errors */ }
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [createSessionAndUser]);

  const loginBiometric = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const success = await biometricAuthService.authenticateUser('Log in with Biometrics');
      if (success) {
        await createSessionAndUser();
      }
      return success;
    } catch (error) {
      console.error('Biometric login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [createSessionAndUser]);

  const loginPasskey = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const { passkeyService } = await import('../services/passkeyService');
      const success = await passkeyService.authenticatePasskey();
      if (success) {
        await createSessionAndUser();
      }
      return success;
    } catch (error) {
      console.error('Passkey login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [createSessionAndUser]);

  const requireBiometricUnlock = useCallback(async (): Promise<boolean> => {
    try {
      const success = await biometricAuthService.authenticateUser('Unlock Sentinel AI');
      if (success) {
        try {
          await securityLogsService.recordLog('BIOMETRIC_SUCCESS', 'App unlocked');
        } catch (_) { /* ignore log errors */ }
        return true;
      }
      return false;
    } catch (error) {
      console.error('Biometric unlock failed:', error);
      return false;
    }
  }, []);

  const register = useCallback(
    async (fullName: string, email: string, phone: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      try {
        const response = await fetch('http://192.168.1.11:5000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fullName, email, phone, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          console.error('Registration error from server:', data.message);
          return false;
        }

        // Save temporarily in ref so login step can pick it up if needed
        registeredDataRef.current = { fullName, email, phone };
        
        // Also save to storage immediately in case of refresh before login
        await authSessionService.saveSession({
           accessToken: 'mock_access_token',
           refreshToken: 'mock_refresh_token',
           expiresAt: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
           userId: data.user.id,
           fullName,
           email,
           phone
        });
        return true;
      } catch (error) {
        console.error('Registration request failed:', error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await authSessionService.clearSession();
    } catch (error) {
      console.warn('Failed to clear session:', error);
    }
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginBiometric,
        loginPasskey,
        register,
        logout,
        checkSession,
        requireBiometricUnlock,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
