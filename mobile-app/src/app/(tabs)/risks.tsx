import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageTransition from '@/components/PageTransition';
import AnimatedCard from '@/components/AnimatedCard';
import AnimatedButton from '@/components/AnimatedButton';
import { SentinelColors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const METRICS = [
  {
    icon: 'lock-closed-outline',
    title: 'Device Posture',
    desc: 'Secure & Encrypted',
    status: 'pass',
  },
  {
    icon: 'location-outline',
    title: 'Location',
    desc: 'Expected Territory',
    status: 'pass',
  },
  {
    icon: 'shield-checkmark-outline',
    title: 'App Integrity',
    desc: 'Verified Bundle ID',
    status: 'pass',
  },
];

export default function RisksScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Top Nav */}
      <View style={styles.topNav}>
        <View style={styles.navLeft}>
          <Pressable style={styles.hamburger}>
            <View style={styles.hamburgerLine} />
            <View style={[styles.hamburgerLine, { width: 16 }]} />
            <View style={styles.hamburgerLine} />
          </Pressable>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backArrow}>←</Text>
          </Pressable>
          <Text style={styles.navTitle}>Risk Engine</Text>
        </View>
        <View style={styles.navRight}>
          <Ionicons name="notifications-outline" size={20} color={SentinelColors.navy} />
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JA</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Health Score Card */}
        <PageTransition delay={100}>
          <View style={styles.scoreCard}>
            <View style={styles.liveBadgeRow}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDotGreen} />
                <Text style={styles.liveBadgeText}>SENTINEL LIVE</Text>
              </View>
            </View>

            <View style={styles.ringOuter}>
              <View style={styles.ringInner}>
                <Text style={styles.scoreNumber}>98</Text>
                <Text style={styles.scoreLabel}>HEALTH SCORE</Text>
              </View>
            </View>

            <View style={styles.lowRiskBadge}>
              <Ionicons name="checkmark-circle" size={14} color="#2E7D32" />
              <Text style={styles.lowRiskText}>LOW RISK PROFILE</Text>
            </View>
          </View>
        </PageTransition>

        {/* Behavioral Metrics */}
        <PageTransition delay={250}>
          <Text style={styles.sectionTitle}>BEHAVIORAL METRICS</Text>
          <View style={styles.metricsList}>
            {METRICS.map((metric, index) => (
              <AnimatedCard key={index} style={styles.metricCard} delay={350} index={index}>
                <View style={styles.metricIconBg}>
                  <Ionicons name={metric.icon as any} size={18} color={SentinelColors.navy} />
                </View>
                <View style={styles.metricInfo}>
                  <Text style={styles.metricTitle}>{metric.title}</Text>
                  <Text style={styles.metricDesc}>{metric.desc}</Text>
                </View>
                <View style={styles.checkCircle}>
                  <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                </View>
              </AnimatedCard>
            ))}
          </View>
        </PageTransition>

        {/* Telemetry + AI Guardian */}
        <PageTransition delay={500}>
          <View style={styles.infoCardsRow}>
            <View style={styles.telemetryCard}>
              <View style={styles.telemetryHeader}>
                <Ionicons name="bar-chart-outline" size={16} color="#FFFFFF" />
                <Text style={styles.telemetryTitle}>TELEMETRY</Text>
              </View>
              <View style={styles.barChart}>
                <View style={[styles.bar, { height: 24, backgroundColor: 'rgba(255,255,255,0.3)' }]} />
                <View style={[styles.bar, { height: 32, backgroundColor: 'rgba(255,255,255,0.4)' }]} />
                <View style={[styles.bar, { height: 20, backgroundColor: 'rgba(255,255,255,0.3)' }]} />
                <View style={[styles.bar, { height: 44, backgroundColor: 'rgba(255,255,255,0.6)' }]} />
                <View style={[styles.bar, { height: 38, backgroundColor: 'rgba(255,255,255,0.5)' }]} />
              </View>
              <Text style={styles.telemetryFooter}>99.2% Stable</Text>
            </View>

            <View style={styles.guardianCard}>
              <View style={styles.guardianHeader}>
                <Ionicons name="shield-checkmark-outline" size={16} color={SentinelColors.navy} />
                <Text style={styles.guardianTitle}>AI GUARDIAN</Text>
              </View>
              <View style={styles.guardianStatusRow}>
                <View style={styles.guardianDot} />
                <Text style={styles.guardianActive}>Active</Text>
              </View>
              <Text style={styles.guardianVersion}>V3.4 Engine</Text>
            </View>
          </View>
        </PageTransition>

        {/* Run Deep Scan */}
        <PageTransition delay={600}>
          <Pressable style={styles.deepScanBtn}>
            <Ionicons name="flash-outline" size={18} color="#FFFFFF" />
            <Text style={styles.deepScanText}>Run Deep Scan</Text>
          </Pressable>
        </PageTransition>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF2F8',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hamburger: {
    gap: 4,
  },
  hamburgerLine: {
    width: 20,
    height: 2,
    backgroundColor: '#041530',
    borderRadius: 1,
  },
  backArrow: {
    fontSize: 20,
    fontWeight: '600',
    color: '#041530',
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#041530',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  navIcon: {
    fontSize: 18,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#041530',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },

  // Score Card
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  liveBadgeRow: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDotGreen: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#041530',
  },
  liveBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#041530',
    letterSpacing: 1,
  },
  ringOuter: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    borderColor: '#041530',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  ringInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 64,
    fontWeight: '800',
    color: '#041530',
  },
  scoreLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7A90',
    letterSpacing: 1.5,
    marginTop: -4,
  },
  lowRiskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  lowRiskCheck: {
    fontSize: 14,
  },
  lowRiskText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2E7D32',
    letterSpacing: 0.5,
  },

  // Section
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7A90',
    letterSpacing: 1.5,
    marginBottom: 12,
    marginTop: 8,
  },

  // Metrics
  metricsList: {
    gap: 12,
    marginBottom: 24,
  },
  metricCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
  },
  metricIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E8EDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  metricIcon: {
    fontSize: 18,
  },
  metricInfo: {
    flex: 1,
  },
  metricTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#041530',
    marginBottom: 3,
  },
  metricDesc: {
    fontSize: 12,
    color: '#6B7A90',
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  // Info Cards Row
  infoCardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  telemetryCard: {
    flex: 1,
    backgroundColor: '#041530',
    borderRadius: 14,
    padding: 16,
    justifyContent: 'space-between',
  },
  telemetryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  telemetryIcon: {
    fontSize: 12,
  },
  telemetryTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  barChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    height: 50,
    marginBottom: 12,
  },
  bar: {
    flex: 1,
    borderRadius: 3,
  },
  telemetryFooter: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.8)',
  },
  guardianCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'space-between',
  },
  guardianHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  guardianIcon: {
    fontSize: 12,
  },
  guardianTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#041530',
    letterSpacing: 1,
  },
  guardianStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  guardianDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#041530',
  },
  guardianActive: {
    fontSize: 20,
    fontWeight: '700',
    color: '#041530',
  },
  guardianVersion: {
    fontSize: 12,
    color: '#6B7A90',
    fontWeight: '500',
  },

  // Deep Scan Button
  deepScanBtn: {
    flexDirection: 'row',
    backgroundColor: '#041530',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#041530',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  deepScanIcon: {
    fontSize: 18,
  },
  deepScanText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
