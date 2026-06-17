import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageTransition from '@/components/PageTransition';
import AnimatedCard from '@/components/AnimatedCard';
import { SentinelColors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MOCK_ALERTS = [
  {
    id: 1,
    type: 'critical',
    title: 'Suspicious Login Attempt',
    time: '14:02',
    badge: 'CRITICAL',
    description: 'An unauthorized login attempt was blocked from an unrecognized IP in Moscow, Russia.',
    date: 'TODAY',
    hasActions: true,
    icon: 'warning-outline',
    color: '#C62828',
    iconBg: '#C62828',
    iconColor: '#FFFFFF',
    badgeBg: '#FCE4EC',
    badgeColor: '#C62828',
  },
  {
    id: 2,
    type: 'warning',
    title: 'New Device Detected',
    time: '09:45',
    badge: 'WARNING',
    description: 'iPhone 15 Pro Max connected to your wallet from London, UK.',
    date: 'TODAY',
    hasMapLink: true,
    icon: 'laptop-outline',
    color: '#208AEF',
    iconBg: '#E2EEFF',
    iconColor: '#208AEF',
    badgeBg: '#E2EEFF',
    badgeColor: '#208AEF',
  },
  {
    id: 3,
    type: 'info',
    title: 'SIM Swap Protection Active',
    time: 'Yesterday',
    badge: 'INFO',
    description: 'Your carrier has confirmed the lock on your mobile number. SIM swapping attempts will be blocked.',
    date: 'TODAY',
    icon: 'phone-portrait-outline',
    color: '#B0BEC5',
    iconBg: '#E8EDF2',
    iconColor: '#6B7A90',
    badgeBg: '#E8EDF2',
    badgeColor: '#6B7A90',
  },
  {
    id: 4,
    type: 'success',
    title: 'Biometric Backup Updated',
    time: '19:18',
    badge: '',
    description: 'Secondary face scan added to trusted devices list.',
    date: 'YESTERDAY',
    hasMapImage: true,
    icon: 'shield-checkmark-outline',
    color: 'transparent',
    iconBg: '#E2EEFF',
    iconColor: '#041530',
  }
];

export default function AlertsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All Alerts');

  const filters = ['All Alerts', 'Critical', 'Warnings', 'Activity'];

  const todayAlerts = MOCK_ALERTS.filter(a => a.date === 'TODAY');
  const yesterdayAlerts = MOCK_ALERTS.filter(a => a.date === 'YESTERDAY');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.topNav}>
        <View style={styles.navLeft}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.navTitle}>Alerts</Text>
          </Pressable>
        </View>
        <View style={styles.navRight}>
          <Ionicons name="search-outline" size={20} color={SentinelColors.navy} />
          <Ionicons name="notifications-outline" size={20} color={SentinelColors.navy} />
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <PageTransition delay={100} type="fadeDown">
          <View style={styles.header}>
            <Text style={styles.title}>Alerts</Text>
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle}>4 unread security notifications</Text>
              <Pressable>
                <Text style={styles.markReadText}>✓ Mark all as read</Text>
              </Pressable>
            </View>
          </View>
        </PageTransition>

        <PageTransition delay={200} type="slideRight">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersScroll}>
            {filters.map((filter, index) => {
              const isActive = activeFilter === filter;
              return (
                <Pressable 
                  key={index} 
                  style={[styles.filterChip, isActive && styles.filterChipActive]}
                  onPress={() => setActiveFilter(filter)}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>{filter}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </PageTransition>

        <PageTransition delay={300}>
          <Text style={styles.sectionTitle}>TODAY</Text>
          <View style={styles.alertsList}>
            {todayAlerts.map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </View>
        </PageTransition>

        <PageTransition delay={500}>
          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>YESTERDAY</Text>
          <View style={styles.alertsList}>
            {yesterdayAlerts.map((alert, index) => (
              <AlertCard key={alert.id} alert={alert} index={index} />
            ))}
          </View>
        </PageTransition>
      </ScrollView>
    </SafeAreaView>
  );
}

function AlertCard({ alert, index }: { alert: typeof MOCK_ALERTS[0], index: number }) {
  return (
    <AnimatedCard 
      style={[
        styles.card, 
        alert.color !== 'transparent' && { borderLeftWidth: 4, borderLeftColor: alert.color }
      ]} 
      delay={400} 
      index={index}
    >
      <View style={styles.cardHeader}>
        <View style={[styles.iconContainer, { backgroundColor: alert.iconBg }]}>
          <Ionicons name={alert.icon as any} size={16} color={alert.iconColor} />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardTitleRow}>
            <Text style={styles.cardTitle} numberOfLines={2}>{alert.title}</Text>
            <View style={styles.cardBadges}>
              {alert.badge ? (
                <View style={[styles.badge, { backgroundColor: alert.badgeBg }]}>
                  <Text style={[styles.badgeText, { color: alert.badgeColor }]}>{alert.badge}</Text>
                </View>
              ) : null}
              <Text style={styles.cardTime}>{alert.time}</Text>
            </View>
          </View>
          <Text style={styles.cardDesc}>{alert.description}</Text>
          
          {alert.hasActions && (
            <View style={styles.actionButtons}>
              <Pressable style={styles.primaryBtn}>
                <Text style={styles.primaryBtnText}>Secure Account</Text>
              </Pressable>
              <Pressable style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Dismiss</Text>
              </Pressable>
            </View>
          )}

          {alert.hasMapLink && (
            <Pressable style={styles.mapLinkBtn}>
              <Text style={styles.mapLinkText}>📍 See Map Details</Text>
            </Pressable>
          )}

          {alert.hasMapImage && (
            <View style={styles.mapImageContainer}>
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderPins}>📍       📍</Text>
                <Text style={styles.mapPlaceholderPinsBottom}>📍</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    </AnimatedCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4FA',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F0F4FA',
  },
  navLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 20,
    fontWeight: '600',
    color: '#041530',
    marginRight: 8,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#041530',
  },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  navIcon: {
    fontSize: 18,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#041530',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#041530',
    marginBottom: 8,
  },
  subtitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7A90',
  },
  markReadText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#041530',
  },
  filtersScroll: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  filterChipActive: {
    backgroundColor: '#041530',
    borderColor: '#041530',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7A90',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7A90',
    letterSpacing: 1,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  alertsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    paddingLeft: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#041530',
    flex: 1,
    paddingRight: 8,
  },
  cardBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardTime: {
    fontSize: 11,
    color: '#6B7A90',
    fontWeight: '500',
  },
  cardDesc: {
    fontSize: 13,
    color: '#6B7A90',
    lineHeight: 18,
    marginBottom: 12,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  primaryBtn: {
    backgroundColor: '#041530',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  secondaryBtnText: {
    color: '#041530',
    fontSize: 12,
    fontWeight: '600',
  },
  mapLinkBtn: {
    marginTop: 4,
  },
  mapLinkText: {
    color: '#208AEF',
    fontSize: 12,
    fontWeight: '600',
  },
  mapImageContainer: {
    marginTop: 12,
    height: 80,
    backgroundColor: '#2C3E50',
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: '#34495E',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderPins: {
    color: '#FF3D71',
    fontSize: 16,
    letterSpacing: 40,
    marginBottom: 10,
  },
  mapPlaceholderPinsBottom: {
    color: '#FF3D71',
    fontSize: 16,
    marginLeft: 60,
  }
});
