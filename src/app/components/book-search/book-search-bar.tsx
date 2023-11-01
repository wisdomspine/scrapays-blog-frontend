import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Logo } from "app/components/logo/logo";
import { LogoutIcon } from "app/components/logout-icon/logout-icon";
import { useRef } from "react";

export interface BookSearchBarProps extends FlexProps {
  query?: string;
  onSearch: (query: string) => void;
  onNew: () => void;
  onLogout: () => void;
}
export function BookSearchBar({
  query,
  onSearch,
  onNew,
  onLogout,
  ...otherProps
}: BookSearchBarProps) {
  const queryRef = useRef(query);
  const timeOutRef = useRef<any>(null);

  function changeHandler(newQuery: string) {
    queryRef.current = newQuery;
    if (timeOutRef.current) {
      window.clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = window.setTimeout(() => {
      onSearch(queryRef.current!);
    }, 500);
  }
  function handleClick() {
    onSearch(queryRef.current!);
    if (timeOutRef.current) {
      window.clearTimeout(timeOutRef.current);
    }
  }
  return (
    <Flex p="4" boxShadow="lg" {...otherProps} justifyContent="space-between">
      {/* Flex for logo and name */}
      <Flex alignItems="center" columnGap="3">
        <Logo fontSize="4xl"></Logo>
        <Heading as="h1" fontSize="2xl" lineHeight="1" hideBelow="md">
          Books
        </Heading>
      </Flex>

      {/* search control goes here */}
      <Flex alignItems="center" columnGap="3">
        <InputGroup>
          <Input
            value={query}
            onChange={(e) => changeHandler(e.target.value)}
            placeholder="Search for books here"
            data-testid="search-input"
          />
          <InputRightElement>
            <IconButton
              aria-label="Search books"
              icon={<SearchIcon />}
              isRound={true}
              variant="ghost"
              data-testid="search-icon-button"
              onClick={handleClick}
            />
          </InputRightElement>
        </InputGroup>

        <Button
          onClick={onNew}
          hideBelow="md"
          colorScheme="brand"
          pr="8"
          pl="8"
          data-testid="new-book-button"
        >
          New Book
        </Button>

        <IconButton
          aria-label="add book"
          icon={<AddIcon color="whiteAlpha.900" />}
          color="brand.500"
          colorScheme="brand"
          onClick={onNew}
          hideFrom="md"
          data-testid="new-book-icon"
        ></IconButton>

        {/* logout button */}
        <IconButton
          aria-label="Logout"
          icon={<LogoutIcon />}
          onClick={onLogout}
          data-testid="logout-icon-button"
          colorScheme="red"
        ></IconButton>
      </Flex>
    </Flex>
  );
}
