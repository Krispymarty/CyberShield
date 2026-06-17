import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  withRepeat,
  withSequence,
  Easing,
  FadeIn,
  FadeOut,
  runOnJS,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AnimatedBackground from '@/components/AnimatedBackground';
import { SentinelColors } from '@/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const [displayText, setDisplayText] = useState('');
  const fullText = 'SENTINEL AI';
  const tagline = 'Your assets. Our shield.';

  // Animation values
  const logoScale = useSharedValue(0);
  const logoRotate = useSharedValue(0);
  const ringScale = useSharedValue(0);
  const ringOpacity = useSharedValue(0);
  const outerRingScale = useSharedValue(0);
  const outerRingOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const ctaOpacity = useSharedValue(0);
  const scanLineY = useSharedValue(-100);
  const glowPulse = useSharedValue(0);

  useEffect(() => {
    // Logo entrance
    logoScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 100 }));
    logoRotate.value = withDelay(300, withTiming(360, { duration: 800, easing: Easing.out(Easing.cubic) }));

    // Inner ring
    ringScale.value = withDelay(800, withSpring(1, { damping: 15, stiffness: 120 }));
    ringOpacity.value = withDelay(800, withTiming(1, { duration: 500 }));

    // Outer ring
    outerRingScale.value = withDelay(1100, withSpring(1, { damping: 15, stiffness: 120 }));
    outerRingOpacity.value = withDelay(1100, withTiming(0.5, { duration: 500 }));

    // Glow pulse
    glowPulse.value = withDelay(
      1500,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.sin) }),
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.sin) })
        ),
        -1,
        true
      )
    );

    // Scan line
    scanLineY.value = withDelay(
      1200,
      withRepeat(
        withTiming(SCREEN_WIDTH, { duration: 2000, easing: Easing.inOut(Easing.linear) }),
        -1,
        true
      )
    );

    // Typewriter text
    let charIndex = 0;
    const typewriterInterval = setInterval(() => {
      if (charIndex < fullText.length) {
        charIndex++;
        setDisplayText(fullText.substring(0, charIndex));
      } else {
        clearInterval(typewriterInterval);
      }
    }, 120);

    // Tagline
    taglineOpacity.value = withDelay(2200, withTiming(1, { duration: 800 }));

    // CTA
    ctaOpacity.value = withDelay(2800, withTiming(1, { duration: 600 }));

    return () => clearInterval(typewriterInterval);
  }, []);

  const navigateToAuth = () => {
    router.replace('/(auth)/register');
  };

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { rotate: `${logoRotate.value}deg` },
    ],
  }));

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale.value }],
    opacity: ringOpacity.value,
  }));

  const outerRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: outerRingScale.value }],
    opacity: outerRingOpacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowPulse.value,
    transform: [{ scale: 1 + glowPulse.value * 0.1 }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  const ctaStyle = useAnimatedStyle(() => ({
    opacity: ctaOpacity.value,
    transform: [{ translateY: (1 - ctaOpacity.value) * 20 }],
  }));

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: scanLineY.value }],
  }));

  return (
    <View style={styles.container}>
      <AnimatedBackground variant="splash" />

      {/* Scan line effect */}
      <Animated.View style={[styles.scanLine, scanLineStyle]} />

      <View style={styles.content}>
        {/* Logo area */}
        <View style={styles.logoArea}>
          {/* Glow behind logo */}
          <Animated.View style={[styles.glow, glowStyle]} />

          {/* Outer ring */}
          <Animated.View style={[styles.outerRing, outerRingStyle]} />

          {/* Inner ring */}
          <Animated.View style={[styles.innerRing, ringStyle]} />

          {/* Shield logo */}
          <Animated.View style={[styles.shieldLogo, logoStyle]}>
            <Text style={styles.shieldIcon}>🛡️</Text>
          </Animated.View>
        </View>

        {/* Title with typewriter */}
        <View style={styles.textArea}>
          <Text style={styles.title}>{displayText}</Text>
          <Text style={styles.cursor}>|</Text>
        </View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, taglineStyle]}>
          {tagline}
        </Animated.Text>

        {/* Security badge */}
        <Animated.View style={[styles.securityBadge, taglineStyle]}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>MILITARY-GRADE ENCRYPTION ACTIVE</Text>
        </Animated.View>
      </View>

      {/* CTA */}
      <Animated.View style={[styles.ctaContainer, ctaStyle]}>
        <Pressable onPress={navigateToAuth} style={styles.ctaButton}>
          <Text style={styles.ctaText}>Get Started →</Text>
        </Pressable>
        <Text style={styles.versionText}>v1.0.0 • Sentinel AI Banking</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030810',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 2,
    height: '100%',
    backgroundColor: SentinelColors.cyan,
    opacity: 0.1,
    zIndex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    zIndex: 2,
  },
  logoArea: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  glow: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: SentinelColors.glow,
  },
  outerRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
  },
  innerRing: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: 'rgba(32, 138, 239, 0.4)',
  },
  shieldLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(32, 138, 239, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldIcon: {
    fontSize: 42,
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: SentinelColors.white,
    letterSpacing: 4,
  },
  cursor: {
    fontSize: 32,
    fontWeight: '300',
    color: SentinelColors.cyan,
    marginLeft: 2,
  },
  tagline: {
    fontSize: 16,
    color: SentinelColors.muted,
    letterSpacing: 1,
    marginBottom: 24,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.08)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.2)',
    gap: 8,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: SentinelColors.success,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: SentinelColors.success,
    letterSpacing: 1.5,
  },
  ctaContainer: {
    paddingHorizontal: 32,
    paddingBottom: 60,
    alignItems: 'center',
    zIndex: 2,
  },
  ctaButton: {
    backgroundColor: SentinelColors.blue,
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    shadowColor: SentinelColors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  versionText: {
    fontSize: 11,
    color: SentinelColors.muted,
    marginTop: 16,
    letterSpacing: 0.5,
  },
});
