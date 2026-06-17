import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageTransition from '@/components/PageTransition';
import { SentinelColors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function WalletsScreen() {
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(0);

  const beneficiaries = [
    { id: 0, name: 'Marcus Richardson', account: 'Ending in •••• 8842', avatar: 'MR' },
    { id: 1, name: 'Elena Rodriguez', account: 'Ending in •••• 1109', avatar: 'ER' },
    { id: 2, name: 'Julian Sterling', account: 'Ending in •••• 4453', avatar: 'JS' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.headerTitle}>Transfer</Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="search-outline" size={20} color={SentinelColors.navy} />
          <Ionicons name="notifications-outline" size={20} color={SentinelColors.navy} />
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <PageTransition delay={100} type="fadeDown">
          <View style={styles.riskCard}>
            <View style={styles.riskIconContainer}>
              <Ionicons name="shield-checkmark" size={20} color="#00C853" />
              <View style={styles.riskDot} />
            </View>
            <View style={styles.riskTextContainer}>
              <Text style={styles.riskLabel}>RISK ANALYSIS</Text>
              <Text style={styles.riskValue}>Risk Check: Optimal</Text>
            </View>
            <Text style={styles.sentinelBadge}>Sentinel AI</Text>
          </View>
        </PageTransition>

        <PageTransition delay={200} type="slideRight">
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ENTER AMOUNT</Text>
            <View style={styles.amountBox}>
              <Text style={styles.currencySymbol}>$</Text>
              <View style={styles.amountCenter}>
                <Text style={styles.amountText}>2500.00</Text>
                <View style={styles.availablePill}>
                  <Text style={styles.availableText}>Available: $12,450.00</Text>
                </View>
              </View>
            </View>
          </View>
        </PageTransition>

        <PageTransition delay={300} type="slideRight">
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>SELECT BENEFICIARY</Text>
              <Text style={styles.addBtn}>+ Add New</Text>
            </View>
            
            <View style={styles.beneficiariesList}>
              {beneficiaries.map((b) => {
                const isSelected = selectedBeneficiary === b.id;
                return (
                  <Pressable 
                    key={b.id} 
                    style={[styles.beneficiaryCard, isSelected && styles.beneficiaryCardSelected]}
                    onPress={() => setSelectedBeneficiary(b.id)}
                  >
                    <View style={styles.beneficiaryAvatar}>
                      <Text style={[styles.beneficiaryAvatarText, isSelected && styles.beneficiaryAvatarTextSelected]}>{b.avatar}</Text>
                    </View>
                    <View style={styles.beneficiaryInfo}>
                      <Text style={[styles.beneficiaryName, isSelected && styles.beneficiaryNameSelected]}>{b.name}</Text>
                      <Text style={[styles.beneficiaryAccount, isSelected && styles.beneficiaryAccountSelected]}>{b.account}</Text>
                    </View>
                    <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                      {isSelected && <Text style={styles.radioCheck}>✓</Text>}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </PageTransition>

        <PageTransition delay={400} type="fadeDown">
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>TRANSACTION SUMMARY</Text>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Transfer Fee</Text>
              <Text style={styles.summaryValueGreen}>$0.00 (Waived)</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Processing Speed</Text>
              <Text style={styles.summaryValue}>Instant (SENTINEL-NET)</Text>
            </View>
            
            <View style={styles.summaryDivider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total to Debit</Text>
              <Text style={styles.summaryTotalValue}>$2,500.00</Text>
            </View>
          </View>
        </PageTransition>

        <PageTransition delay={500} type="fadeDown">
          <Pressable style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Review Transfer →</Text>
          </Pressable>
        </PageTransition>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backIcon: {
    fontSize: 24,
    color: SentinelColors.navy,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: SentinelColors.navy,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: SentinelColors.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: SentinelColors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  riskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SentinelColors.white,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: SentinelColors.cardBorder,
    marginBottom: 24,
  },
  riskIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  riskDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#00C853',
    borderWidth: 2,
    borderColor: SentinelColors.white,
  },
  riskTextContainer: {
    flex: 1,
  },
  riskLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: SentinelColors.muted,
    letterSpacing: 1,
    marginBottom: 2,
  },
  riskValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00897B',
  },
  sentinelBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: SentinelColors.blue,
    backgroundColor: '#E8F0FE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: SentinelColors.muted,
    letterSpacing: 1,
    marginTop: 12,
  },
  addBtn: {
    fontSize: 12,
    fontWeight: '600',
    color: SentinelColors.blue,
    marginTop: 12,
  },
  amountBox: {
    backgroundColor: SentinelColors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: SentinelColors.navy,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  currencySymbol: {
    fontSize: 20,
    color: '#90CAF9',
    fontWeight: '600',
    marginTop: 4,
  },
  amountCenter: {
    flex: 1,
    alignItems: 'center',
  },
  amountText: {
    fontSize: 32,
    fontWeight: '600',
    color: SentinelColors.navy,
    marginBottom: 12,
  },
  availablePill: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  availableText: {
    color: '#1565C0',
    fontSize: 12,
    fontWeight: '600',
  },
  beneficiariesList: {
    gap: 12,
  },
  beneficiaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SentinelColors.white,
    borderWidth: 1,
    borderColor: SentinelColors.cardBorder,
    padding: 16,
    borderRadius: 12,
  },
  beneficiaryCardSelected: {
    backgroundColor: SentinelColors.navy,
    borderColor: SentinelColors.navy,
  },
  beneficiaryAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F4F6F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  beneficiaryAvatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: SentinelColors.navy,
  },
  beneficiaryAvatarTextSelected: {
    color: '#90CAF9',
  },
  beneficiaryInfo: {
    flex: 1,
  },
  beneficiaryName: {
    fontSize: 16,
    fontWeight: '600',
    color: SentinelColors.navy,
    marginBottom: 4,
  },
  beneficiaryNameSelected: {
    color: '#90CAF9', // Light blue name as in screenshot
  },
  beneficiaryAccount: {
    fontSize: 12,
    color: SentinelColors.muted,
  },
  beneficiaryAccountSelected: {
    color: 'rgba(255,255,255,0.6)',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: SentinelColors.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#E3F2FD',
  },
  radioCheck: {
    color: SentinelColors.navy,
    fontSize: 14,
    fontWeight: '900',
  },
  summaryCard: {
    backgroundColor: '#F4F6F9',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E9F0',
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: SentinelColors.muted,
    letterSpacing: 1,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: SentinelColors.muted,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: SentinelColors.navy,
  },
  summaryValueGreen: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00C853',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E9F0',
    marginVertical: 12,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: SentinelColors.navy,
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: SentinelColors.navy,
  },
  reviewButton: {
    backgroundColor: SentinelColors.navy,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
  },
  reviewButtonText: {
    color: SentinelColors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
