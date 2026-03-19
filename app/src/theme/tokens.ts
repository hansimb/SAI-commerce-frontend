import { brandTheme } from "./brand";

export const themeTokens = {
  fonts: {
    body: { value: brandTheme.fonts.body },
    heading: { value: brandTheme.fonts.heading },
    mono: { value: brandTheme.fonts.mono },
  },
  semanticTokens: {
    colors: {
      bg: {
        value: {
          _light: brandTheme.colors.background.light,
          _dark: brandTheme.colors.background.dark,
        },
      },
      layoutBg: {
        value: {
          _light: brandTheme.colors.layout.light,
          _dark: brandTheme.colors.layout.dark,
        },
      },
      fg: {
        value: {
          _light: brandTheme.colors.text.light,
          _dark: brandTheme.colors.text.dark,
        },
      },
      fgMuted: {
        value: {
          _light: brandTheme.colors.textMuted.light,
          _dark: brandTheme.colors.textMuted.dark,
        },
      },
      fgHeading: {
        value: {
          _light: brandTheme.colors.heading.light,
          _dark: brandTheme.colors.heading.dark,
        },
      },
      border: {
        value: {
          _light: brandTheme.colors.border.light,
          _dark: brandTheme.colors.border.dark,
        },
      },
      separator: {
        value: {
          _light: brandTheme.colors.separator.light,
          _dark: brandTheme.colors.separator.dark,
        },
      },
      accent: {
        value: {
          _light: brandTheme.colors.accent.light,
          _dark: brandTheme.colors.accent.dark,
        },
      },
    },
  },
  typography: brandTheme.typography,
} as const;
