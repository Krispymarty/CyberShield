import React from 'react';
import { StyleSheet, View } from 'react-native';

interface AnimatedBackgroundProps {
  variant?: 'dark' | 'splash';
}

export default function AnimatedBackground({ variant = 'dark' }: AnimatedBackgroundProps) {
  const bgColor = variant === 'splash' ? '#041530' : '#F4F6F9';

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]} pointerEvents="none" />
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
});
