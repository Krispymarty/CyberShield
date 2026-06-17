import React from 'react';
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { SentinelColors } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

import { Ionicons } from '@expo/vector-icons';

const TAB_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home-outline',
  wallets: 'card-outline',
  alerts: 'notifications-outline',
  security: 'shield-checkmark-outline',
  risks: 'analytics-outline',
};

const TAB_ICONS_FOCUSED: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home',
  wallets: 'card',
  alerts: 'notifications',
  security: 'shield-checkmark',
  risks: 'analytics',
};

const TAB_LABELS: Record<string, string> = {
  index: 'Home',
  wallets: 'Wallets',
  alerts: 'Alerts',
  security: 'Security',
  risks: 'Risks',
};

function TabItem({
  routeName,
  isFocused,
  onPress,
  onLongPress,
}: {
  routeName: string;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  React.useEffect(() => {
    if (isFocused) {
      scale.value = withTiming(1.05, { duration: 150 });
    } else {
      scale.value = withTiming(1, { duration: 150 });
    }
  }, [isFocused]);

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(isFocused ? 1.05 : 1, { duration: 100 });
  };

  const iconName = isFocused ? (TAB_ICONS_FOCUSED[routeName] || 'apps') : (TAB_ICONS[routeName] || 'apps-outline');
  const label = TAB_LABELS[routeName] || routeName;

  return (
    <AnimatedPressable
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.tabItem, isFocused && styles.tabItemActive, animatedStyle]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={22} color={isFocused ? SentinelColors.navy : SentinelColors.muted} />
      </View>
      <Text style={[styles.label, isFocused && styles.labelActive]}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 12) }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabItem
              key={route.key}
              routeName={route.name}
              isFocused={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  tabItemActive: {
    backgroundColor: 'rgba(32, 138, 239, 0.08)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: SentinelColors.muted,
  },
  labelActive: {
    color: SentinelColors.navy,
  },
});
