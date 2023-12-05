import {
  ThemeConfig,
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const fallbackFonts = `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

export const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: "blue" }),
  withDefaultVariant({ variant: "ghost", components: ["Button"] }),
  {
    config,
    semanticTokens: {
      colors: {
        MBorder: { _light: "gray.300", _dark: "#202836" },
        MBackground: { _light: "white", _dark: "#121212" },
        MAppBarShow: { _light: "white.700", _dark: "#12121299" },
        MGrayText: { _light: "#424242", _dark: "#d1d1d1" },
        MTitleText: { _light: "gray.900", _dark: "#dfdfdf" },
        MRedText: { _light: "#ff4d4d", _dark: "#e38686" },
      },
    },
    styles: {
      global: () => ({
        "#root": {
          background: "MBorder",
        },
      }),
    },
    fonts: {
      heading: `'Poppins', ${fallbackFonts}`,
      body: `'Poppins', ${fallbackFonts}`,
    },
  }
);
