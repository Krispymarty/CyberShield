import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import AnimatedCard from '@/components/AnimatedCard';
import SecurityScoreRing from '@/components/SecurityScoreRing';
import PageTransition from '@/components/PageTransition';
import AnimatedButton from '@/components/AnimatedButton';
import { useAuth } from '@/context/AuthContext';
import { SentinelColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { securityScoreService } from '@/services/securityScore';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [score, setScore] = useState(0);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const loadScore = async () => {
    const data = await securityScoreService.calculateScore();
    setScore(data.score);
  };

  useFocusEffect(
    useCallback(() => {
      loadScore();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadScore();
    setRefreshing(false);
  }, []);

  const firstName = user?.fullName?.split(' ')[0] || 'User';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={SentinelColors.cyan} />
        }
      >
        <PageTransition delay={100} type="fadeDown">
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning, {firstName}</Text>
              <Text style={styles.subtitle}>Your assets are being monitored by Sentinel AI.</Text>
            </View>
            <Pressable onPress={() => setIsProfileModalVisible(true)} style={styles.profileAvatar}>
                <Text style={styles.profileInitials}>{firstName.charAt(0)}</Text>
            </Pressable>
          </View>
        </PageTransition>

        <PageTransition delay={200}>
          <View style={styles.scoreContainer}>
            <SecurityScoreRing score={score} delay={300} />
          </View>
        </PageTransition>

        <PageTransition delay={300} type="slideRight">
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Accounts</Text>
            <Text style={styles.sectionAction}>Manage ›</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsScroll}>
            <AnimatedCard style={[styles.accountCard, styles.primaryAccountCard]} delay={400} index={0}>
              <Text style={styles.accountType}>Main Savings</Text>
              <Text style={styles.accountBalance}>$42,905.00</Text>
              <View style={styles.accountFooter}>
                <Text style={styles.accountNumber}>•••• 8832</Text>
                <View style={styles.cardBrandIcon} />
              </View>
            </AnimatedCard>

            <AnimatedCard style={[styles.accountCard, { backgroundColor: '#E2EEFF', borderColor: '#D0E1F9' }]} delay={400} index={1}>
              <Text style={[styles.accountType, { color: SentinelColors.navy }]}>Platinum Credit</Text>
              <Text style={[styles.accountBalance, { color: SentinelColors.navy }]}>$3,250.00</Text>
              <View style={styles.accountFooter}>
                <Text style={[styles.accountNumber, { color: SentinelColors.muted }]}>•••• 1094</Text>
              </View>
            </AnimatedCard>
          </ScrollView>
        </PageTransition>

        <PageTransition delay={400}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>
          
          <View style={styles.quickActionsGrid}>
            <AnimatedCard style={[styles.actionCard, { backgroundColor: '#F0F4FA' }]} delay={500} index={0}>
              <View style={[styles.actionIconContainer, { backgroundColor: '#8CAECF' }]}>
                <Ionicons name="swap-horizontal" size={18} color={SentinelColors.white} />
              </View>
              <Text style={styles.actionTitle} numberOfLines={1} adjustsFontSizeToFit>Transfer</Text>
            </AnimatedCard>
            
            <AnimatedCard style={[styles.actionCard, { backgroundColor: SentinelColors.navy }]} delay={500} index={1}>
              <View style={[styles.actionIconContainer, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                <Ionicons name="scan-outline" size={18} color={SentinelColors.white} />
              </View>
              <Text style={[styles.actionTitle, { color: SentinelColors.white }]} numberOfLines={1} adjustsFontSizeToFit>Scan QR</Text>
            </AnimatedCard>

            <AnimatedCard style={[styles.actionCard, { backgroundColor: '#FCE4EC' }]} delay={500} index={2}>
              <View style={[styles.actionIconContainer, { backgroundColor: SentinelColors.danger }]}>
                <Ionicons name="notifications-outline" size={18} color={SentinelColors.white} />
              </View>
              <Text style={[styles.actionTitle, { color: SentinelColors.danger }]} numberOfLines={1} adjustsFontSizeToFit>2 Alerts</Text>
            </AnimatedCard>

            <AnimatedCard style={[styles.actionCard, { backgroundColor: '#F4F6F9', borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)' }]} delay={500} index={3}>
               <View style={[styles.actionIconContainer, { backgroundColor: '#607D8B' }]}>
                <Ionicons name="shield-checkmark-outline" size={18} color={SentinelColors.white} />
              </View>
              <Text style={styles.actionTitle} numberOfLines={1} adjustsFontSizeToFit>Security Center</Text>
            </AnimatedCard>
          </View>
        </PageTransition>

        <PageTransition delay={500}>
           <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <Text style={styles.sectionAction}>See All</Text>
          </View>
          
          <View style={styles.activityList}>
              <AnimatedCard style={styles.activityItem} delay={600} index={0}>
                 <View style={[styles.activityIconContainer, { backgroundColor: '#E2EEFF' }]}>
                     <Ionicons name="bag-handle-outline" size={20} color={SentinelColors.blue} />
                 </View>
                 <View style={styles.activityDetails}>
                     <Text style={styles.activityName}>Apple Store</Text>
                     <Text style={styles.activityMeta}>Technology • Today</Text>
                 </View>
                 <View style={styles.activityAmountContainer}>
                     <Text style={styles.activityAmount}>-$1,299.00</Text>
                     <View style={styles.verifiedBadge}>
                         <Text style={styles.verifiedText}>VERIFIED</Text>
                     </View>
                 </View>
              </AnimatedCard>

              <AnimatedCard style={[styles.activityItem, { backgroundColor: '#FCE4EC', borderColor: '#F8BBD0' }]} delay={600} index={1}>
                 <View style={[styles.activityIconContainer, { backgroundColor: SentinelColors.danger }]}>
                     <Ionicons name="warning-outline" size={20} color={SentinelColors.white} />
                 </View>
                 <View style={styles.activityDetails}>
                     <Text style={[styles.activityName, { color: SentinelColors.danger }]}>Unusual Login</Text>
                     <Text style={styles.activityMeta}>New Device • San Jose, CA</Text>
                 </View>
                 <View style={styles.activityAmountContainer}>
                     <AnimatedButton title="Review" variant="danger" onPress={() => {}} style={styles.reviewButton} textStyle={{fontSize: 10}} fullWidth={false} />
                 </View>
              </AnimatedCard>
              
              <AnimatedCard style={styles.activityItem} delay={600} index={2}>
                 <View style={[styles.activityIconContainer, { backgroundColor: '#E2EEFF' }]}>
                     <Ionicons name="cafe-outline" size={20} color={SentinelColors.blue} />
                 </View>
                 <View style={styles.activityDetails}>
                     <Text style={styles.activityName}>Blue Bottle Coffee</Text>
                     <Text style={styles.activityMeta}>Food & Drink • Yesterday</Text>
                 </View>
                 <View style={styles.activityAmountContainer}>
                     <Text style={styles.activityAmount}>-$6.50</Text>
                     <View style={styles.verifiedBadge}>
                         <Text style={styles.verifiedText}>VERIFIED</Text>
                     </View>
                 </View>
              </AnimatedCard>
          </View>

          <View style={{height: 40, alignItems: 'center', justifyContent: 'center'}}>
               <Text style={{color: SentinelColors.muted, fontSize: 12, textDecorationLine: 'underline'}} onPress={logout}>Sign Out (Dev)</Text>
          </View>
        </PageTransition>

      </ScrollView>

      {/* Profile Modal */}
      <Modal
        visible={isProfileModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsProfileModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>User Profile</Text>
              <Pressable onPress={() => setIsProfileModalVisible(false)}>
                <Ionicons name="close" size={24} color={SentinelColors.navy} />
              </Pressable>
            </View>
            
            <View style={styles.modalBody}>
              <View style={styles.profileDetailRow}>
                <Text style={styles.profileDetailLabel}>Full Name</Text>
                <Text style={styles.profileDetailValue}>{user?.fullName || 'Not provided'}</Text>
              </View>
              <View style={styles.profileDetailRow}>
                <Text style={styles.profileDetailLabel}>Email</Text>
                <Text style={styles.profileDetailValue}>{user?.email || 'Not provided'}</Text>
              </View>
              <View style={styles.profileDetailRow}>
                <Text style={styles.profileDetailLabel}>Phone Number</Text>
                <Text style={styles.profileDetailValue}>{user?.phone || 'Not provided'}</Text>
              </View>
            </View>

            <Pressable style={styles.closeModalButton} onPress={() => setIsProfileModalVisible(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 24,
  },
  greeting: {
    color: SentinelColors.navy,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: SentinelColors.muted,
    fontSize: 12,
  },
  profileAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(32, 138, 239, 0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: SentinelColors.blue,
  },
  profileInitials: {
      color: SentinelColors.cyan,
      fontWeight: '700',
      fontSize: 16,
  },
  scoreContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    color: SentinelColors.navy,
    fontSize: 18,
    fontWeight: '700',
  },
  sectionAction: {
    color: SentinelColors.blue,
    fontSize: 12,
    fontWeight: '600',
  },
  cardsScroll: {
    paddingHorizontal: 16,
    gap: 16,
  },
  accountCard: {
    width: 280,
    height: 160,
    marginLeft: 8,
    justifyContent: 'space-between',
  },
  primaryAccountCard: {
    backgroundColor: SentinelColors.navy,
    borderColor: SentinelColors.navy,
  },
  accountType: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
  },
  accountBalance: {
    color: SentinelColors.white,
    fontSize: 32,
    fontWeight: '700',
    marginVertical: 8,
  },
  accountFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accountNumber: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    letterSpacing: 2,
  },
  cardBrandIcon: {
    width: 32,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
    justifyContent: 'center',
  },
  actionCard: {
    width: '47%',
    aspectRatio: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  actionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgba(32, 138, 239, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    color: SentinelColors.navy,
    fontSize: 12,
    fontWeight: '600',
  },
  activityList: {
      paddingHorizontal: 24,
      gap: 12,
  },
  activityItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderRadius: 16,
  },
  activityIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: 'rgba(255,255,255,0.1)',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
  },
  activityDetails: {
      flex: 1,
  },
  activityName: {
    color: SentinelColors.navy,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  activityMeta: {
      color: SentinelColors.muted,
      fontSize: 11,
  },
  activityAmountContainer: {
      alignItems: 'flex-end',
  },
  activityAmount: {
    color: SentinelColors.navy,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  verifiedBadge: {
      backgroundColor: 'rgba(32, 138, 239, 0.15)',
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
  },
  verifiedText: {
      color: SentinelColors.cyan,
      fontSize: 8,
      fontWeight: '700',
      letterSpacing: 0.5,
  },
  reviewButton: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(4, 21, 48, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: SentinelColors.navy,
  },
  modalBody: {
    gap: 16,
    marginBottom: 32,
  },
  profileDetailRow: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    paddingBottom: 12,
  },
  profileDetailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: SentinelColors.muted,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  profileDetailValue: {
    fontSize: 16,
    color: SentinelColors.navy,
    fontWeight: '500',
  },
  closeModalButton: {
    backgroundColor: SentinelColors.navy,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: SentinelColors.white,
    fontSize: 16,
    fontWeight: '700',
  }
});
