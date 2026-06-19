import React from 'react';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { SentinelColors } from '@/constants/theme';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function AuthLayout() {
  return (
    <>
      <AnimatedBackground />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'none',
        }}
      >
        <Stack.Screen name="register" />
        <Stack.Screen name="login" />
      </Stack>
    </>
  );
}
