import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Logo } from "app/components/logo/logo";
import { Page } from "app/components/page/page";

export function LoginPage() {
  const { loginWithPopup } = useAuth0();
  function clickHandler() {
    loginWithPopup();
  }
  return (
    <Page
      flexFlow="column"
      justifyContent="center"
      alignItems="center"
      display="flex"
      bgColor="gray.800"
      rowGap="6"
    >
      <Logo fontSize="4xl"></Logo>
      <Card width="min(95vw, 440px)" pt={5} boxShadow="xl" pb={5}>
        <CardHeader>
          <Heading>Login to continue...</Heading>
        </CardHeader>
        <CardBody>
          <Flex
            flexFlow={{ base: "column", md: "row" }}
            alignItems={{ base: "stretch", md: "center" }}
            rowGap="5"
            columnGap="5"
          >
            <Button
              variant="outline"
              colorScheme="brand"
              flexGrow={{ md: "1" }}
              flexBasis={{ md: "0px" }}
              onClick={clickHandler}
            >
              Sign up
            </Button>
            <Button
              variant="solid"
              colorScheme="brand"
              flexGrow={{ md: "1" }}
              flexBasis={{ md: "0px" }}
              onClick={clickHandler}
            >
              Login
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Page>
  );
}
