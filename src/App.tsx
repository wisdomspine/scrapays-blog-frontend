import { ChakraBaseProvider } from "@chakra-ui/react";
import { AuthProvider } from "app/providers/auth-provider";
import { GraphQLProvider } from "app/providers/graphql-provider";
import { AppRouter } from "app/router";
import { theme } from "theme";
export const App = () => (
  <ChakraBaseProvider theme={theme}>
    <AuthProvider>
      <GraphQLProvider>
        <AppRouter></AppRouter>
      </GraphQLProvider>
    </AuthProvider>
  </ChakraBaseProvider>
);
