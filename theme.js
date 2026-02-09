/**
 * Modern Premium Design System for Servify
 * Inspired by Apple Human Interface Guidelines & Material You
 */

export const colors = {
  // Primary - Teal accent for interactive elements
  primary: '#06D6A0',
  primaryLight: '#1DE9B6',
  primaryDark: '#00897B',

  // Neutrals - Refined dark palette
  surface: '#0F172A',        // Dark background
  surfaceAlt: '#1A202C',     // Slightly lighter surface
  card: '#1E293B',           // Card backgrounds
  border: '#334155',         // Subtle borders
  
  // Text
  textPrimary: '#F1F5F9',    // Main text
  textSecondary: '#CBD5E1',  // Secondary text
  textTertiary: '#94A3B8',   // Tertiary text
  textHint: '#64748B',       // Hint text

  // Semantic
  success: '#06D6A0',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Special
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

export const typography = {
  // Font sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,

  // Font weights
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
};

export const radius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.20,
    shadowRadius: 24,
    elevation: 8,
  },
};

export const timing = {
  fast: 150,
  base: 250,
  slow: 350,
};

export default {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  timing,
};
