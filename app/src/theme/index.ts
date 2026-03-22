import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";
import { brandTheme } from "./brand";
import { themeTokens } from "./tokens";

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorScheme: "dark",
    },
    body: {
      background: "bg",
      color: "fg",
      fontFamily: brandTheme.fonts.body,
      lineHeight: themeTokens.typography.bodyLineHeight,
    },
    ".chakra-heading, h1, h2, h3, h4, h5, h6": {
      color: "fgHeading",
      fontFamily: brandTheme.fonts.heading,
      fontWeight: themeTokens.typography.headingWeight,
      lineHeight: themeTokens.typography.headingLineHeight,
      letterSpacing: themeTokens.typography.headingLetterSpacing,
    },
    hr: {
      borderColor: "separator",
    },
    ".chakra-icon": {
      color: "accent",
    },
  },
  theme: {
    tokens: {
      fonts: themeTokens.fonts,
    },
    semanticTokens: themeTokens.semanticTokens,
    recipes: {
      heading: defineRecipe({
        base: {
          fontFamily: brandTheme.fonts.heading,
          color: "fgHeading",
          fontWeight: themeTokens.typography.headingWeight,
          lineHeight: themeTokens.typography.headingLineHeight,
          letterSpacing: themeTokens.typography.headingLetterSpacing,
        },
      }),
      icon: defineRecipe({
        base: {
          color: "accentDim",
        },
      }),
      separator: defineRecipe({
        base: {
          borderColor: "separator",
        },
      }),
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
