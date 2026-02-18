import { ViewStyle, TextStyle } from 'react-native';

export const COLORS = {
  bg: {
    primary: '#F4F1EA', // Muted Eggshell
  },
  accent: {
    gold: '#D4AF37', // Gold
    platinum: '#E5E4E2', // Platinum
    // Gradient helper: use ['#D4AF37', '#E5E4E2']
  },
  glass: {
    white: 'rgba(255, 255, 255, 0.30)',
    border: 'rgba(255, 255, 255, 0.50)',
    shadow: 'rgba(0, 0, 0, 0.08)',
  },
  text: {
    primary: '#1A1A1A', // Dark text for contrast on eggshell
    secondary: '#666666',
    inverse: '#FFFFFF',
  }
} as const;

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 40,
} as const;

export const RADIUS = {
  card: 16,
  capsule: 24,
  round: 999,
} as const;

export const TYPOGRAPHY: Record<string, TextStyle> = {
  h1: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: COLORS.text.primary,
  },
  h2: {
    fontSize: 24,
    fontWeight: '600',
    letterSpacing: -0.3,
    color: COLORS.text.primary,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: COLORS.text.primary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.text.secondary,
  }
};

export const GLASS: Record<string, ViewStyle> = {
  card: {
    backgroundColor: COLORS.glass.white,
    borderColor: COLORS.glass.border,
    borderWidth: 0.5,
    borderRadius: RADIUS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, // mapped from rgba(0,0,0,0.08)
    shadowRadius: 24,
    elevation: 5, // Android fallback
    // Note: Use <BlurView> from expo-blur for the actual blur effect
  },
  capsule: {
    backgroundColor: COLORS.glass.white,
    borderColor: COLORS.glass.border,
    borderWidth: 0.5,
    borderRadius: RADIUS.capsule,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 5,
  }
};
