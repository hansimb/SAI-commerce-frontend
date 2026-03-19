export const brandTheme = {
  fonts: {
    body: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    heading: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    mono: "var(--font-geist-mono), monospace",
  },
  colors: {
    background: "#0a0a0a",
    layout: "#242424",
    text: "#adadad",
    textMuted: "#c7c7c7",
    heading: "#f5f5f5",
    border: "#333333",
    separator: "#b06d00",
    accent: "#df8d45",
  },
  typography: {
    bodyLineHeight: "1.5",
    headingLineHeight: "1.2",
    headingWeight: "700",
    headingLetterSpacing: "-0.02em",
  },
} as const;
