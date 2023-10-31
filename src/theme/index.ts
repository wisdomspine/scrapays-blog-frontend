import { extendBaseTheme, theme as defaultTheme } from "@chakra-ui/react";

export const theme = extendBaseTheme({
  colors: {
    ...defaultTheme.colors,
    brand: defaultTheme.colors.teal,
  },
  components: {
    Button: defaultTheme.components.Button,
    Card: defaultTheme.components.Card,
    Heading: defaultTheme.components.Heading,
  },
});
