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
      bright: "#f06d36",
      default: "#f06d36",
      dim: "#f06d36",
    },
  },
  typography: {
    bodyLineHeight: "1.5",
    headingLineHeight: "1.2",
    headingWeight: "700",
    headingLetterSpacing: "-0.02em",
  },
} as const;
