import React from 'react';
import Animated, {
  FadeInDown,
  FadeInUp,
  SlideInRight,
} from 'react-native-reanimated';

interface PageTransitionProps {
  children: React.ReactNode;
  delay?: number;
  type?: 'fadeUp' | 'fadeDown' | 'slideRight';
}

export default function PageTransition({
  children,
  delay = 0,
  type = 'fadeUp',
}: PageTransitionProps) {
  const getEntering = () => {
    switch (type) {
      case 'fadeDown':
        return FadeInDown.delay(delay).duration(600).springify().damping(15);
      case 'slideRight':
        return SlideInRight.delay(delay).duration(500).springify().damping(15);
      case 'fadeUp':
      default:
        return FadeInDown.delay(delay).duration(600).springify().damping(15);
    }
  };

  return (
    <Animated.View entering={getEntering()}>
      {children}
    </Animated.View>
  );
}
