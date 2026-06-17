import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { SentinelColors, AnimationConfig } from '@/constants/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

interface AnimatedInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function AnimatedInput({
  label,
  error,
  icon,
  value,
  onFocus,
  onBlur,
  secureTextEntry,
  ...props
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry || false);
  const focusProgress = useSharedValue(0);
  const labelPosition = useSharedValue(value ? 1 : 0);
  const scale = useSharedValue(1);
  const shakeX = useSharedValue(0);

  const containerAnimatedStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusProgress.value,
      [0, 1],
      [SentinelColors.cardBorder, SentinelColors.cyan]
    );

    return {
      borderColor,
      transform: [
        { scale: scale.value },
        { translateX: shakeX.value },
      ],
      shadowColor: SentinelColors.cyan,
      shadowOpacity: focusProgress.value * 0.3,
      shadowRadius: focusProgress.value * 12,
    };
  });

  const labelAnimatedStyle = useAnimatedStyle(() => {
    const isUp = labelPosition.value > 0.5;
    return {
      transform: [
        { translateY: isUp ? -28 : 0 },
        { scale: isUp ? 0.85 : 1 },
      ],
      color: interpolateColor(
        focusProgress.value,
        [0, 1],
        [SentinelColors.muted, SentinelColors.cyan]
      ),
    };
  });

  const handleFocus = (e: any) => {
    setIsFocused(true);
    focusProgress.value = withTiming(1, { duration: 300 });
    labelPosition.value = withSpring(1, AnimationConfig.spring);
    scale.value = withSpring(1.02, AnimationConfig.spring);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    focusProgress.value = withTiming(0, { duration: 300 });
    if (!value) {
      labelPosition.value = withSpring(0, AnimationConfig.spring);
    }
    scale.value = withSpring(1, AnimationConfig.spring);
    onBlur?.(e);
  };

  return (
    <View style={styles.wrapper}>
      <AnimatedView style={[styles.container, containerAnimatedStyle]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <View style={styles.inputWrapper}>
          <Animated.Text style={[styles.label, labelAnimatedStyle]}>
            {label}
          </Animated.Text>
          <TextInput
            style={styles.input}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholderTextColor="transparent"
            selectionColor={SentinelColors.cyan}
            secureTextEntry={isPasswordHidden}
            {...props}
          />
          {secureTextEntry && (
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            >
              <Feather
                name={isPasswordHidden ? 'eye-off' : 'eye'}
                size={20}
                color={SentinelColors.muted}
              />
            </TouchableOpacity>
          )}
        </View>
      </AnimatedView>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SentinelColors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: SentinelColors.cardBorder,
    paddingHorizontal: 16,
    paddingVertical: 4,
    minHeight: 58,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
  },
  iconContainer: {
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    left: 0,
    top: 18,
    fontSize: 15,
    color: SentinelColors.muted,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: SentinelColors.navy,
    paddingVertical: 8,
    fontWeight: '500',
  },
  eyeIconContainer: {
    padding: 8,
    marginRight: -8,
  },
  errorText: {
    color: SentinelColors.danger,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 16,
    fontWeight: '500',
  },
});
