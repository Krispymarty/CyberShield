import React from 'react';
import { Tabs } from 'expo-router';
import CustomTabBar from '@/components/TabBar';
import AnimatedBackground from '@/components/AnimatedBackground';
import { SentinelColors } from '@/constants/theme';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FA' }}>
      <AnimatedBackground />
      <Tabs
        tabBar={(props) => <CustomTabBar {...(props as any)} />}
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="wallets"
          options={{
            title: 'Wallets',
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            title: 'Alerts',
          }}
        />
        <Tabs.Screen
          name="security"
          options={{
            title: 'Security',
          }}
        />
        <Tabs.Screen
          name="risks"
          options={{
            title: 'Risks',
          }}
        />
      </Tabs>
    </View>
  );
}
