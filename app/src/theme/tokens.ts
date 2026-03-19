export const themeTokens = {
  fonts: {
    body: { value: "var(--font-geist-sans), Arial, Helvetica, sans-serif" },
    heading: { value: "var(--font-geist-sans), Arial, Helvetica, sans-serif" },
    mono: { value: "var(--font-geist-mono), monospace" },
  },
  semanticTokens: {
    colors: {
      bg: {
        value: {
          _light: "#ffffff",
          _dark: "#0a0a0a",
        },
      },
      fg: {
        value: {
          _light: "#171717",
          _dark: "#ededed",
        },
      },
    },
  },
} as const;
