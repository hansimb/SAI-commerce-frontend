import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { themeTokens } from "./tokens";

const customConfig = defineConfig({
  globalCss: {
    html: {
      colorScheme: "light",
      _dark: {
        colorScheme: "dark",
      },
    },
    body: {
      background: "bg",
      color: "fg",
      fontFamily: "body",
    },
  },
  theme: {
    tokens: {
      fonts: themeTokens.fonts,
    },
    semanticTokens: themeTokens.semanticTokens,
  },
});

export const system = createSystem(defaultConfig, customConfig);
