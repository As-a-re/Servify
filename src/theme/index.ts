import colors from './colors';
import typography from './typography';
import { spacing, borderRadius, shadows } from './spacing';

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out',
  },
};

export default theme;
