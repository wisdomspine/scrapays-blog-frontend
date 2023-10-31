import { ChakraProvider, theme } from "@chakra-ui/react";
import { TestButton } from "@components/test-button/test-button";
export const App = () => (
  <ChakraProvider theme={theme}>
    <TestButton>Hello world 2</TestButton>
  </ChakraProvider>
);
