export const typography = {
  // Font families - System fonts for accessibility and performance
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
  },

  // Heading styles
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: 1.4,
    letterSpacing: '0em',
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: '0em',
  },

  // Body text styles
  body: {
    lg: {
      fontSize: '1.125rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0em',
    },
    base: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0em',
    },
    sm: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
    xs: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0em',
    },
  },

  // Label and caption styles
  label: {
    fontWeight: 600,
    fontSize: '0.875rem',
    lineHeight: 1.4,
    letterSpacing: '0.01em',
  },
  caption: {
    fontWeight: 500,
    fontSize: '0.75rem',
    lineHeight: 1.4,
    letterSpacing: '0.01em',
  },
  button: {
    fontWeight: 600,
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0em',
    textTransform: 'none',
  },
};

export default typography;
