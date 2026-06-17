import { Stack, useRouter, useSegments } from 'expo-router';
import { AppState, AppStateStatus, View, Text } from 'react-native';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { useEffect, useRef, useState, useCallback } from 'react';
import { securitySettingsService } from '@/services/securitySettings';
import '@/global.css';

function RootLayoutNav() {
  const { isAuthenticated, isLoading, requireBiometricUnlock } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  
  const appState = useRef(AppState.currentState);
  const backgroundTime = useRef<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const hasNavigated = useRef(false);

  // Route Guarding
  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inSplash = segments[0] === 'splash';
    const inTabs = segments[0] === '(tabs)';
    
    // Don't redirect while on splash - let the splash handle its own navigation
    if (inSplash) return;

    if (!isAuthenticated && inTabs) {
      // Only redirect away from tabs if not authenticated
      router.replace('/(auth)/login');
    } else if (isAuthenticated && inAuthGroup) {
      // Only redirect away from auth if authenticated
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, isLoading, segments]);

  // App Lock Logic
  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState: AppStateStatus) => {
      try {
        const settings = await securitySettingsService.getSettings();
        
        if (!settings.autoLockEnabled || !isAuthenticated) {
          appState.current = nextAppState;
          return;
        }

        if (appState.current.match(/active/) && nextAppState.match(/inactive|background/)) {
          backgroundTime.current = Date.now();
        } else if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
          if (backgroundTime.current) {
            const timeInBackground = Date.now() - backgroundTime.current;
            // Lock if backgrounded for more than 30 seconds (30000 ms)
            if (timeInBackground > 30000) {
              setIsLocked(true);
              const unlocked = await requireBiometricUnlock();
              if (unlocked) {
                setIsLocked(false);
              }
            }
          }
        }
      } catch (error) {
        console.warn('App lock error:', error);
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, requireBiometricUnlock]);

  if (isLocked) {
    return (
      <View style={{ flex: 1, backgroundColor: '#041530', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, marginBottom: 20 }}>App Locked</Text>
        <Text 
          style={{ color: '#208AEF', fontSize: 16 }}
          onPress={async () => {
            const unlocked = await requireBiometricUnlock();
            if (unlocked) setIsLocked(false);
          }}
        >
          Tap to unlock
        </Text>
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
        contentStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="index" options={{ animation: 'none' }} />
      <Stack.Screen name="splash" options={{ animation: 'none' }} />
      <Stack.Screen name="(auth)" options={{ animation: 'none' }} />
      <Stack.Screen name="(tabs)" options={{ animation: 'none' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
