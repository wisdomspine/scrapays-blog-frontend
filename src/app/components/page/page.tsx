import { Box, BoxProps, forwardRef } from "@chakra-ui/react";

/**
 * This is a wrapper around full page components
 * It ensure such pages atleast occupy the whole screen
 */
export const Page = forwardRef((props: BoxProps, ref) => {
  return <Box {...props} minWidth="100vw" minHeight="100vh" ref={ref}></Box>;
});
