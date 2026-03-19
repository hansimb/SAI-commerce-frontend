import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react";
import { themeTokens } from "./tokens";

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorScheme: "dark",
    },
    body: {
      background: "bg",
      color: "fg",
      fontFamily: "body",
      lineHeight: themeTokens.typography.bodyLineHeight,
    },
    "h1, h2, h3, h4, h5, h6": {
      color: "fgHeading",
      fontFamily: "heading",
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
