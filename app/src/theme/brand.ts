export const brandTheme = {
  layoutWidth: "",
  fonts: {
    body: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    heading: "var(--font-playfair-display), Georgia, serif",
    mono: "var(--font-geist-mono), monospace",
  },
  colors: {
    background: "#0a0a0a",
    layout: "#121212",
    text: "#cccccc",
    textMuted: "#c7c7c7",
    heading: "#f5f5f5",
    border: "#333333",
    accent: {
      bright: "#ff9d00",
      default: "#db8700",
      dim: "#ba7300",
    },
  },
  typography: {
    bodyLineHeight: "1.5",
    headingLineHeight: "1.2",
    headingWeight: "700",
    headingLetterSpacing: "-0.02em",
  },
} as const;
