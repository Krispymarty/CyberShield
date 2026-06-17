import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { SlideInRight } from 'react-native-reanimated';
import AnimatedInput from '@/components/AnimatedInput';
import PageTransition from '@/components/PageTransition';
import { useAuth } from '@/context/AuthContext';
import { SentinelColors } from '@/constants/theme';

export default function RegisterScreen() {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const handleNext = () => {
    setErrorMsg('');
    if (step === 1) {
      if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
        setErrorMsg('Please fill in all identity fields.');
        return;
      }
      if (!formData.email.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.verificationCode || formData.verificationCode.length < 6) {
        setErrorMsg('Please enter the 6-digit code.');
        return;
      }
      setStep(3);
    } else {
      if (!formData.password || !formData.confirmPassword) {
        setErrorMsg('Please fill in password fields.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
      handleRegister();
    }
  };

  const handleRegister = async () => {
    try {
      const success = await register(formData.fullName, formData.email, formData.phone, formData.password);
      if (success) {
        router.replace('/(auth)/login');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const stepTitles = ['Identity', 'Verification', 'Security'];
  const progress = Math.round((step / 3) * 100);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.topBarLeft}>
            <Text style={styles.brandName}>Sentinel AI</Text>
            <View style={styles.brandDot} />
          </View>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <PageTransition delay={100}>

            {/* Step Indicator */}
            <View style={styles.stepContainer}>
              <Text style={styles.stepLabel}>STEP {step} OF 3</Text>
              <View style={styles.stepTitleRow}>
                <Text style={styles.stepTitle}>{stepTitles[step - 1]}</Text>
                <Text style={styles.percentText}>{progress}% Complete</Text>
              </View>
              <View style={styles.progressBarBg}>
                <Animated.View 
                  style={[styles.progressBarFill, { width: `${progress}%` }]} 
                />
              </View>
            </View>

            {/* Form Card */}
            <View style={styles.formCard}>
              <Text style={styles.formDesc}>
                Please provide your legal information to begin the secure verification process. 
                Sentinel AI uses banking-grade encryption to protect your data.
              </Text>

              {errorMsg ? (
                <Text style={styles.errorText}>{errorMsg}</Text>
              ) : null}

              {step === 1 && (
                <Animated.View entering={SlideInRight.springify()} style={styles.stepContent}>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>FULL NAME</Text>
                    <AnimatedInput
                      label="Johnathan Doe"
                      value={formData.fullName}
                      onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                      autoCapitalize="words"
                    />
                  </View>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>WORK EMAIL</Text>
                    <AnimatedInput
                      label="john@enterprise.com"
                      value={formData.email}
                      onChangeText={(text) => setFormData({ ...formData, email: text })}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>PHONE NUMBER</Text>
                    <AnimatedInput
                      label="(555) 000-0000"
                      value={formData.phone}
                      onChangeText={(text) => setFormData({ ...formData, phone: text })}
                      keyboardType="phone-pad"
                    />
                  </View>
                </Animated.View>
              )}

              {step === 2 && (
                <Animated.View entering={SlideInRight.springify()} style={styles.stepContent}>
                  <Text style={styles.mockText}>SMS verification code has been sent.</Text>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>VERIFICATION CODE</Text>
                    <AnimatedInput
                      label="Enter 6-digit code"
                      value={formData.verificationCode}
                      onChangeText={(text) => setFormData({ ...formData, verificationCode: text })}
                      keyboardType="number-pad"
                      maxLength={6}
                    />
                  </View>
                </Animated.View>
              )}

              {step === 3 && (
                <Animated.View entering={SlideInRight.springify()} style={styles.stepContent}>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>PASSWORD</Text>
                    <AnimatedInput
                      label="Create a strong password"
                      value={formData.password}
                      onChangeText={(text) => setFormData({ ...formData, password: text })}
                      secureTextEntry
                    />
                  </View>
                  <View style={styles.fieldGroup}>
                    <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
                    <AnimatedInput
                      label="Confirm your password"
                      value={formData.confirmPassword}
                      onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                      secureTextEntry
                    />
                  </View>
                </Animated.View>
              )}
            </View>

            {/* Identity Shield Banner */}
            <View style={styles.shieldBanner}>
              <View style={styles.shieldIconCircle}>
                <Text style={styles.shieldIconText}>🛡️</Text>
              </View>
              <View style={styles.shieldTextContainer}>
                <Text style={styles.shieldTitle}>Identity Shield Active</Text>
                <Text style={styles.shieldDesc}>
                  Real-time fraud prevention is analyzing your entry signature.
                </Text>
              </View>
            </View>

            {/* Next Button */}
            <Pressable 
              style={[styles.nextBtn, isLoading && { opacity: 0.7 }]} 
              onPress={handleNext}
              disabled={isLoading}
            >
              <Text style={styles.nextBtnText}>
                {isLoading ? 'Processing...' : step === 3 ? 'Complete Setup →' : 'Next →'}
              </Text>
            </Pressable>

            {/* Already have account */}
            <View style={styles.loginLinkContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <Text 
                style={styles.loginLink} 
                onPress={() => router.push('/(auth)/login')}
              >
                Log in
              </Text>
            </View>

          </PageTransition>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F8',
  },
  keyboardView: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#041530',
  },
  brandDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#208AEF',
  },
  closeIcon: {
    fontSize: 20,
    color: '#6B7A90',
    fontWeight: '300',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 0,
  },
  stepContainer: {
    marginBottom: 24,
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#208AEF',
    letterSpacing: 1,
    marginBottom: 8,
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#041530',
  },
  percentText: {
    fontSize: 12,
    color: '#6B7A90',
    fontWeight: '500',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: '#D0E1F9',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#041530',
    borderRadius: 2,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  formDesc: {
    fontSize: 13,
    color: '#6B7A90',
    lineHeight: 20,
    marginBottom: 24,
  },
  stepContent: {
    gap: 4,
  },
  fieldGroup: {
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#041530',
    letterSpacing: 1,
    marginBottom: 6,
  },
  mockText: {
    color: '#6B7A90',
    fontSize: 13,
    marginBottom: 16,
  },
  shieldBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#208AEF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  shieldIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  shieldIconText: {
    fontSize: 16,
  },
  shieldTextContainer: {
    flex: 1,
  },
  shieldTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  shieldDesc: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    lineHeight: 16,
  },
  nextBtn: {
    backgroundColor: '#041530',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#041530',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  loginText: {
    color: '#6B7A90',
    fontSize: 14,
  },
  loginLink: {
    color: '#208AEF',
    fontSize: 14,
    fontWeight: '600',
  },
  errorText: {
    color: SentinelColors.danger,
    fontSize: 13,
    marginBottom: 16,
    fontWeight: '500',
  },
});
