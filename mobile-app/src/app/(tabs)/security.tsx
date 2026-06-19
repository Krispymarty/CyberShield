import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import PageTransition from '@/components/PageTransition';
import AnimatedCard from '@/components/AnimatedCard';
import { SentinelColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { securityScoreService, SecurityScoreStatus } from '@/services/securityScore';
import { securitySettingsService, SecuritySettings } from '@/services/securitySettings';
import { securityLogsService, SecurityLog } from '@/services/securityLogs';

export default function SecurityScreen() {
  const [scoreData, setScoreData] = useState<SecurityScoreStatus>({ score: 0, status: 'CRITICAL', recommendations: [] });
  const [settings, setSettings] = useState<SecuritySettings | null>(null);
  const [logs, setLogs] = useState<SecurityLog[]>([]);

  const loadData = async () => {
    const sData = await securityScoreService.calculateScore();
    const currentSettings = await securitySettingsService.getSettings();
    const currentLogs = await securityLogsService.getLogs();
    
    setScoreData(sData);
    setSettings(currentSettings);
    setLogs(currentLogs.slice(0, 3)); // show top 3
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const toggleSetting = async (key: keyof SecuritySettings, value: boolean) => {
    if (!settings) return;
    setSettings(prev => prev ? { ...prev, [key]: value } : null);
    await securitySettingsService.updateSettings({ [key]: value });
    // Recalculate score
    const sData = await securityScoreService.calculateScore();
    setScoreData(sData);
  };

  const getScoreColor = () => {
    if (scoreData.score >= 80) return '#2E7D32';
    if (scoreData.score >= 50) return '#E65100';
    return '#D32F2F';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Main Score Card */}
        <PageTransition delay={100}>
          <View style={styles.scoreCard}>
            <View style={styles.secureBadgeContainer}>
              <View style={[styles.secureBadge, { backgroundColor: scoreData.score >= 80 ? '#E8F5E9' : '#FFF3E0' }]}>
                <Text style={[styles.secureBadgeText, { color: getScoreColor() }]}><Ionicons name="shield-checkmark" size={10} color={getScoreColor()} /> {scoreData.status}</Text>
              </View>
            </View>
            
            <View style={styles.scoreBoxContainer}>
              <View style={[styles.scoreBox, { borderColor: scoreData.score >= 80 ? '#E2EEFF' : '#FFEBEE' }]}>
                <Text style={styles.scoreNumber}>{scoreData.score}</Text>
                <Text style={styles.scoreLabel}>SCORE / 100</Text>
              </View>
            </View>
            
            <Text style={styles.scoreTitle}>{scoreData.score >= 80 ? 'Your identity is shielded' : 'Action recommended'}</Text>
            <Text style={styles.scoreDesc}>
              {scoreData.recommendations.length > 0 ? scoreData.recommendations[0] : 'Sentinel AI is monitoring 1,240 real-time transaction nodes for your protection.'}
            </Text>
          </View>
        </PageTransition>

        {/* Toggle Cards */}
        <PageTransition delay={200}>
          <AnimatedCard style={styles.toggleCard} delay={300} index={0}>
            <View style={styles.toggleHeader}>
              <View style={styles.toggleIconContainer}>
                <Ionicons name="card-outline" size={20} color={SentinelColors.navy} />
              </View>
              <Switch 
                value={settings?.simProtection ?? true} 
                onValueChange={(v) => toggleSetting('simProtection', v)}
                trackColor={{ true: '#041530', false: '#D0E1F9' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D0E1F9"
              />
            </View>
            <Text style={styles.toggleTitle}>SIM Swap Protection</Text>
            <Text style={styles.toggleDesc}>
              Prevents unauthorized porting of your mobile number to a new carrier.
            </Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>ACTIVE MONITORING</Text>
            </View>
          </AnimatedCard>

          <AnimatedCard style={styles.toggleCard} delay={300} index={1}>
            <View style={styles.toggleHeader}>
              <View style={styles.toggleIconContainer}>
                <Ionicons name="shield-outline" size={20} color={SentinelColors.navy} />
              </View>
              <Switch 
                value={settings?.impersonationShield ?? true} 
                onValueChange={(v) => toggleSetting('impersonationShield', v)}
                trackColor={{ true: '#041530', false: '#D0E1F9' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#D0E1F9"
              />
            </View>
            <Text style={styles.toggleTitle}>Impersonation Shield</Text>
            <Text style={styles.toggleDesc}>
              AI-driven detection for deepfake voice and synthetic social engineering.
            </Text>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>SCANNING BIOMETRICS</Text>
            </View>
          </AnimatedCard>
        </PageTransition>

        {/* Registered Devices */}
        <PageTransition delay={400}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Registered Devices</Text>
            <Pressable>
              <Text style={styles.sectionAction}>ADD NEW</Text>
            </Pressable>
          </View>

          <View style={styles.devicesList}>
            <AnimatedCard style={styles.deviceCard} delay={500} index={0}>
              <View style={styles.deviceIconBg}>
                <Ionicons name="phone-portrait-outline" size={20} color={SentinelColors.navy} />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>iPhone 15 Pro</Text>
                <Text style={styles.deviceMeta}>Primary • San Francisco, CA</Text>
              </View>
              <Pressable>
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </AnimatedCard>

            <AnimatedCard style={styles.deviceCard} delay={500} index={1}>
              <View style={styles.deviceIconBg}>
                <Ionicons name="laptop-outline" size={20} color={SentinelColors.navy} />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>MacBook Pro M3</Text>
                <Text style={styles.deviceMeta}>Trusted • Home Office</Text>
              </View>
              <Pressable>
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </AnimatedCard>

            <AnimatedCard style={styles.deviceCard} delay={500} index={2}>
              <View style={styles.deviceIconBg}>
                <Ionicons name="tablet-landscape-outline" size={20} color={SentinelColors.navy} />
              </View>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceName}>Galaxy Tab S9</Text>
                <Text style={styles.deviceMeta}>Limited • Traveling</Text>
              </View>
              <Pressable>
                <Text style={styles.removeText}>Remove</Text>
              </Pressable>
            </AnimatedCard>
          </View>
        </PageTransition>

        {/* Recent Security Events */}
        <PageTransition delay={600}>
          <View style={styles.eventsCardContainer}>
            <View style={styles.eventsCard}>
              <View style={styles.eventsHeader}>
                <Text style={styles.eventsTitle}>Recent Security Events</Text>
              </View>
              
              {logs.length > 0 ? logs.map((log, index) => {
                let bgColor = '#E8F5E9';
                let iconColor = '#2E7D32';
                let iconName: any = 'checkmark';
                let statusColor = '#2E7D32';
                let statusText = 'VERIFIED';
                
                if (log.type.includes('FAILURE')) {
                  bgColor = '#FFF3E0';
                  iconColor = '#E65100';
                  iconName = 'warning';
                  statusColor = '#E65100';
                  statusText = 'FAILED';
                } else if (log.type === 'DEVICE_CHANGE' || log.type === 'SETTINGS_CHANGE') {
                  bgColor = '#E0F2F1';
                  iconColor = '#00695C';
                  iconName = 'build';
                  statusColor = '#455A64';
                  statusText = 'UPDATED';
                } else if (log.type === 'LOGIN_SUCCESS') {
                  iconName = 'arrow-forward';
                }

                return (
                  <React.Fragment key={log.id}>
                    <View style={styles.eventRow}>
                      <View style={[styles.eventIcon, { backgroundColor: bgColor }]}>
                        <Ionicons name={iconName} size={16} color={iconColor} />
                      </View>
                      <View style={styles.eventInfo}>
                        <Text style={styles.eventName}>{log.type.replace('_', ' ')}</Text>
                        <Text style={styles.eventMeta}>{log.details}</Text>
                      </View>
                      <View style={styles.eventRight}>
                        <Text style={styles.eventTime}>Recent</Text>
                        <Text style={[styles.eventStatus, { color: statusColor }]}>{statusText}</Text>
                      </View>
                    </View>
                    {index < logs.length - 1 && <View style={styles.divider} />}
                  </React.Fragment>
                );
              }) : (
                <View style={{ padding: 20, alignItems: 'center' }}>
                  <Text style={{ color: SentinelColors.muted, fontSize: 12 }}>No recent security events</Text>
                </View>
              )}

              <Pressable style={styles.auditLogBtn}>
                <Text style={styles.auditLogText}>VIEW FULL AUDIT LOG</Text>
              </Pressable>
            </View>
          </View>
        </PageTransition>

        {/* Live Network Monitor */}
        <PageTransition delay={700}>
          <View style={styles.liveNetworkCard}>
            <View style={styles.liveHeaderRow}>
              <Ionicons name="radio-outline" size={14} color="#208AEF" style={{marginRight: 8}} />
              <Text style={styles.liveTitle}>SENTINEL NETWORK LIVE</Text>
            </View>
            <Text style={styles.liveDesc}>
              Scanning 4.2M packets/sec globally. Zero anomalies detected in your zone.
            </Text>
          </View>
        </PageTransition>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
    gap: 16,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  secureBadgeContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: -10,
    zIndex: 1,
  },
  secureBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  secureBadgeText: {
    color: '#2E7D32',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  scoreBoxContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreBox: {
    width: 140,
    height: 140,
    borderWidth: 4,
    borderColor: '#E2EEFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '800',
    color: '#041530',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7A90',
    letterSpacing: 1,
  },
  scoreTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#041530',
    marginBottom: 8,
  },
  scoreDesc: {
    fontSize: 13,
    color: '#6B7A90',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 16,
  },
  toggleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  toggleIconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleIcon: {
    fontSize: 20,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#041530',
    marginBottom: 6,
  },
  toggleDesc: {
    fontSize: 12,
    color: '#6B7A90',
    lineHeight: 18,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#041530',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#041530',
    letterSpacing: 0.5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#041530',
  },
  sectionAction: {
    fontSize: 11,
    fontWeight: '700',
    color: '#041530',
    textDecorationLine: 'underline',
    letterSpacing: 0.5,
  },
  devicesList: {
    gap: 12,
  },
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  deviceIconBg: {
    width: 40,
    height: 40,
    backgroundColor: '#E2EEFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  deviceIcon: {
    fontSize: 20,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#041530',
    marginBottom: 4,
  },
  deviceMeta: {
    fontSize: 12,
    color: '#6B7A90',
  },
  removeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#C62828',
  },
  eventsCardContainer: {
    marginTop: 8,
  },
  eventsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  eventsHeader: {
    padding: 20,
    paddingBottom: 12,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#041530',
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#041530',
    marginBottom: 4,
  },
  eventMeta: {
    fontSize: 11,
    color: '#6B7A90',
  },
  eventRight: {
    alignItems: 'flex-end',
  },
  eventTime: {
    fontSize: 11,
    color: '#041530',
    fontWeight: '600',
    marginBottom: 4,
  },
  eventStatus: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginHorizontal: 20,
  },
  auditLogBtn: {
    backgroundColor: '#F0F4FA',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  auditLogText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#041530',
    letterSpacing: 1,
  },
  liveNetworkCard: {
    backgroundColor: '#041530',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
    marginBottom: 20,
  },
  liveHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  liveIcon: {
    color: '#208AEF',
    fontSize: 14,
    marginRight: 8,
  },
  liveTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  liveDesc: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    lineHeight: 18,
  }
});
