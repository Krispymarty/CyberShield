import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { otpAuthService } from '@/services/otpAuth';

export default function LoginScreen() {
  const router = useRouter();
  const { login, loginBiometric, loginPasskey, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const success = await login(email, password);
      if (success) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBiometricLogin = async () => {
    try {
      const success = await loginBiometric();
      if (success) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasskeyLogin = async () => {
    try {
      const success = await loginPasskey();
      if (success) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOtpRequest = async () => {
    try {
      const success = await otpAuthService.requestOTP('user@example.com');
      if (success) {
        Alert.alert(
          'OTP Sent',
          'A mock passcode has been sent. Tap OK to auto-verify.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'OK',
              onPress: async () => {
                const valid = await otpAuthService.verifyOTP('1234');
                if (valid) {
                  await login(email, password);
                  router.replace('/(tabs)');
                } else {
                  Alert.alert('Error', 'Invalid OTP');
                }
              },
            },
          ]
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">

            {/* Header Text */}
            <PageTransition delay={100}>
              <Text style={styles.headerLabel}>Login - Sentinel AI Mobile</Text>
            </PageTransition>

            {/* Logo Area */}
            <PageTransition delay={200}>
              <View style={styles.logoArea}>
                <View style={styles.logoRow}>
                  <View style={styles.shieldCircle}>
                    <Text style={styles.shieldEmoji}>🛡️</Text>
                  </View>
                  <View style={styles.barsContainer}>
                    <View style={[styles.bar, { height: 16 }]} />
                    <View style={[styles.bar, { height: 24 }]} />
                  </View>
                </View>
                <Text style={styles.brandTitle}>Sentinel AI</Text>
                <Text style={styles.brandSubtitle}>Enterprise-grade transaction security</Text>
              </View>
            </PageTransition>

            {/* Verify Identity */}
            <PageTransition delay={300}>
              <View style={styles.verifySection}>
                <View style={styles.verifyIconBg}>
                  <Text style={styles.verifyIcon}>🤖</Text>
                </View>
                <Text style={styles.verifyLabel}>VERIFY IDENTITY</Text>
              </View>
            </PageTransition>

            {/* Passkey Button */}
            <PageTransition delay={400}>
              <Pressable 
                style={[styles.passkeyBtn, isLoading && { opacity: 0.7 }]} 
                onPress={handlePasskeyLogin}
                disabled={isLoading}
              >
                <Text style={styles.passkeyIcon}>🔐</Text>
                <Text style={styles.passkeyText}>
                  {isLoading ? 'Authenticating...' : 'Sign in with Passkey'}
                </Text>
              </Pressable>
            </PageTransition>

            {/* Divider */}
            <PageTransition delay={450}>
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>
            </PageTransition>

            {/* Biometrics Button */}
            <PageTransition delay={500}>
              <Pressable style={styles.biometricBtn} onPress={handleBiometricLogin} disabled={isLoading}>
                <Text style={styles.biometricIcon}>☝️</Text>
                <Text style={styles.biometricText}>Use Biometrics</Text>
              </Pressable>
            </PageTransition>

            {/* OTP Link */}
            <PageTransition delay={550}>
              <Pressable style={styles.otpLink} onPress={handleOtpRequest}>
                <Text style={styles.otpLinkText}>Receive One-Time Passcode (OTP)</Text>
              </Pressable>
            </PageTransition>

            {/* Footer Badges */}
            <PageTransition delay={600}>
              <View style={styles.badgeRow}>
                <View style={styles.badge}>
                  <Text style={styles.badgeIcon}>🛡️</Text>
                  <Text style={styles.badgeText}>FIDO2 READY</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeIcon}>🔒</Text>
                  <Text style={styles.badgeText}>ENCRYPTED</Text>
                </View>
              </View>
            </PageTransition>

            <PageTransition delay={650}>
              <Text style={styles.footerText}>Protected by Sentinel Shield © 2024</Text>
            </PageTransition>

            {/* Register link */}
            <PageTransition delay={700}>
              <View style={styles.registerLinkContainer}>
                <Text style={styles.registerText}>Don't have an account? </Text>
                <Text 
                  style={styles.registerLink} 
                  onPress={() => router.push('/(auth)/register')}
                >
                  Sign up
                </Text>
              </View>
            </PageTransition>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#041530',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  headerLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 32,
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  shieldCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(32, 138, 239, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldEmoji: {
    fontSize: 22,
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  bar: {
    width: 6,
    borderRadius: 3,
    backgroundColor: '#208AEF',
  },
  brandTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  brandSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '400',
  },
  verifySection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  verifyIconBg: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  verifyIcon: {
    fontSize: 28,
  },
  verifyLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
  },
  passkeyBtn: {
    flexDirection: 'row',
    backgroundColor: '#208AEF',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 20,
    shadowColor: '#208AEF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  passkeyIcon: {
    fontSize: 18,
  },
  passkeyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '600',
  },
  biometricBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  biometricIcon: {
    fontSize: 16,
  },
  biometricText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  otpLink: {
    alignItems: 'center',
    marginBottom: 40,
  },
  otpLinkText: {
    color: '#208AEF',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgeIcon: {
    fontSize: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 0.5,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 11,
    color: 'rgba(255,255,255,0.25)',
    marginBottom: 24,
  },
  registerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  registerLink: {
    color: '#208AEF',
    fontSize: 14,
    fontWeight: '600',
  },
});
