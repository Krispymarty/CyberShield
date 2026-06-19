import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  Easing,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { SentinelColors } from '@/constants/theme';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface SecurityScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  delay?: number;
}

export default function SecurityScoreRing({
  score,
  size = 160,
  strokeWidth = 10,
  label = 'SECURE',
  sublabel = 'SENTINEL LIVE',
  delay = 300,
}: SecurityScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useSharedValue(0);
  const glowOpacity = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(score / 100, { duration: 1500, easing: Easing.out(Easing.cubic) })
    );

    glowOpacity.value = withDelay(
      delay + 1500,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      )
    );

    pulseScale.value = withDelay(
      delay + 1500,
      withRepeat(
        withSequence(
          withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.sin) }),
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      )
    );
  }, [score]);

  const animatedCircleProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: pulseScale.value }],
  }));

  const scoreColor = score >= 80 ? SentinelColors.success : score >= 50 ? SentinelColors.warning : SentinelColors.danger;

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Glow ring behind */}
      <Animated.View
        style={[
          styles.glowRing,
          {
            width: size + 20,
            height: size + 20,
            borderRadius: (size + 20) / 2,
            borderColor: scoreColor,
          },
          glowStyle,
        ]}
      />

      <Svg width={size} height={size} style={styles.svg}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={SentinelColors.cardBorder}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          animatedProps={animatedCircleProps}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      {/* Center content */}
      <View style={styles.centerContent}>
        <Text style={[styles.scoreText, { color: scoreColor }]}>{score}%</Text>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.liveIndicator}>
          <View style={[styles.liveDot, { backgroundColor: SentinelColors.blue }]} />
          <Text style={[styles.sublabel, { color: SentinelColors.blue }]}>{sublabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  glowRing: {
    position: 'absolute',
    borderWidth: 2,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 10,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: SentinelColors.muted,
    letterSpacing: 2,
    marginTop: 2,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  sublabel: {
    fontSize: 9,
    fontWeight: '600',
    color: SentinelColors.success,
    letterSpacing: 1,
  },
});
