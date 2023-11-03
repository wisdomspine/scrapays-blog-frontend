import { ChakraBaseProvider } from "@chakra-ui/react";
import { AuthProvider } from "app/providers/auth-provider";
import { GraphQLProvider } from "app/providers/graphql-provider";
import { ScreenLoaderProvider } from "app/providers/screen-loader-provider";
import { AppRouter } from "app/router";
import { theme } from "theme";
export const App = () => (
  <ChakraBaseProvider theme={theme}>
    <ScreenLoaderProvider>
      <AuthProvider>
        <GraphQLProvider>
          <AppRouter></AppRouter>
        </GraphQLProvider>
      </AuthProvider>
    </ScreenLoaderProvider>
  </ChakraBaseProvider>
);
