export const brandTheme = {
  fonts: {
    body: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    heading: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    mono: "var(--font-geist-mono), monospace",
  },
  colors: {
    background: {
      light: "#ffffff",
      dark: "#0a0a0a",
    },
    layout: {
      light: "#ffffff",
      dark: "#525252",
    },
    text: {
      light: "#111111",
      dark: "#adadad",
    },
    textMuted: {
      light: "#525252",
      dark: "#c7c7c7",
    },
    heading: {
      light: "#111111",
      dark: "#f5f5f5",
    },
    border: {
      light: "#e5e5e5",
      dark: "#333333",
    },
    separator: {
      light: "#c97832",
      dark: "#b06d00",
    },
    accent: {
      light: "#c97832",
      dark: "#df8d45",
    },
  },
  typography: {
    bodyLineHeight: "1.5",
    headingLineHeight: "1.2",
    headingWeight: "700",
    headingLetterSpacing: "-0.02em",
  },
} as const;
