import { ChakraBaseProvider } from "@chakra-ui/react";
import { AppRouter } from "app/router";
import { theme } from "theme";
export const App = () => (
  <ChakraBaseProvider theme={theme}>
    <AppRouter></AppRouter>
  </ChakraBaseProvider>
);
