import { brandTheme } from "./brand";

export const themeTokens = {
  layoutWidth: brandTheme.layoutWidth,
  fonts: {
    body: { value: brandTheme.fonts.body },
    heading: { value: brandTheme.fonts.heading },
    mono: { value: brandTheme.fonts.mono },
  },
  semanticTokens: {
    colors: {
      bg: { value: brandTheme.colors.background },
      layoutBg: { value: brandTheme.colors.layout },
      fg: { value: brandTheme.colors.text },
      fgMuted: { value: brandTheme.colors.textMuted },
      fgHeading: { value: brandTheme.colors.heading },
      border: { value: brandTheme.colors.border },
      separator: { value: brandTheme.colors.accent.dim },
      accent: { value: brandTheme.colors.accent.default },
      accentBright: { value: brandTheme.colors.accent.bright },
      accentDim: { value: brandTheme.colors.accent.dim },
    },
  },
  typography: brandTheme.typography,
} as const;
