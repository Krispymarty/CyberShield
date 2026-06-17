/**
 * Sentinel AI Banking App - Theme Constants
 * Dark-first futuristic theme with cyber-security aesthetic
 */

import '@/global.css';

import { Platform } from 'react-native';

export const SentinelColors = {
  navy: '#041530',
  dark: '#010A16',
  blue: '#1358AC',
  cyan: '#208AEF',
  card: '#FFFFFF',
  cardBorder: 'rgba(0,0,0,0.1)',
  glow: 'rgba(32,138,239,0.15)',
  glowBlue: 'rgba(32,138,239,0.15)',
  success: '#041530',
  danger: '#C62828',
  warning: '#FFAA00',
  muted: '#6B7A90',
  surface: '#FFFFFF',
  surfaceLight: '#F0F4FA',
  white: '#FFFFFF',
  textPrimary: '#041530',
  textSecondary: '#6B7A90',
  textDark: '#010A16',
  gradient: {
    primary: ['#1358AC', '#208AEF'] as const,
    dark: ['#041530', '#1358AC'] as const,
    card: ['#FFFFFF', '#F0F4FA'] as const,
    danger: ['#FF3D71', '#FF6B6B'] as const,
    success: ['#00E676', '#00C853'] as const,
  },
} as const;

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const AnimationConfig = {
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 0.5,
  },
  springBouncy: {
    damping: 10,
    stiffness: 200,
    mass: 0.3,
  },
  duration: {
    fast: 200,
    normal: 400,
    slow: 800,
    splash: 2500,
  },
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
