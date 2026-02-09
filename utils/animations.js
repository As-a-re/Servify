/**
 * Reusable animation configurations for smooth micro-interactions
 */

import { Animated } from 'react-native';
import theme from '../theme';

// Scale animation for button press
export const createScaleAnimation = (toValue = 0.95) => {
  const scaleValue = new Animated.Value(1);
  
  const scaleIn = () => {
    Animated.spring(scaleValue, {
      toValue,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };
  
  const scaleOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
    }).start();
  };
  
  return { scaleValue, scaleIn, scaleOut };
};

// Fade animation
export const createFadeAnimation = (duration = 300) => {
  const fadeValue = new Animated.Value(0);
  
  const fadeIn = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };
  
  const fadeOut = () => {
    Animated.timing(fadeValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };
  
  return { fadeValue, fadeIn, fadeOut };
};

// Slide animation
export const createSlideAnimation = (duration = 300) => {
  const slideValue = new Animated.Value(100);
  
  const slideUp = () => {
    Animated.timing(slideValue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  };
  
  const slideDown = () => {
    Animated.timing(slideValue, {
      toValue: 100,
      duration,
      useNativeDriver: true,
    }).start();
  };
  
  return { slideValue, slideUp, slideDown };
};

// Pulse animation for attention
export const createPulseAnimation = () => {
  const pulseValue = new Animated.Value(1);
  
  const pulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  const stopPulse = () => {
    pulseValue.setValue(1);
  };
  
  return { pulseValue, pulse, stopPulse };
};

// Rotation animation
export const createRotateAnimation = (duration = 800) => {
  const rotateValue = new Animated.Value(0);
  
  const startRotate = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      })
    ).start();
  };
  
  const stopRotate = () => {
    rotateValue.setValue(0);
  };
  
  const rotation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  return { rotation, startRotate, stopRotate };
};

// Bounce animation
export const createBounceAnimation = () => {
  const bounceValue = new Animated.Value(0);
  
  const bounce = () => {
    Animated.sequence([
      Animated.timing(bounceValue, {
        toValue: -10,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(bounceValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  return { bounceValue, bounce };
};

export default {
  createScaleAnimation,
  createFadeAnimation,
  createSlideAnimation,
  createPulseAnimation,
  createRotateAnimation,
  createBounceAnimation,
};
