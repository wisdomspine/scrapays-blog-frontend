import { ChakraBaseProvider } from "@chakra-ui/react";
import { AuthProvider } from "app/providers/auth-provider";
import { AppRouter } from "app/router";
import { theme } from "theme";
export const App = () => (
  <ChakraBaseProvider theme={theme}>
    <AuthProvider>
      <AppRouter></AppRouter>
    </AuthProvider>
  </ChakraBaseProvider>
);
