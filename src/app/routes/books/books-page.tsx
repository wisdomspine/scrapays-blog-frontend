import { useMutation, useQuery } from "@apollo/client";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { BookRow } from "app/components/book-row/book-row";
import { BookSearchBar } from "app/components/book-search/book-search-bar";
import { ConfirmAction } from "app/components/confirm-action/confirm-action";
import { EmptyState } from "app/components/empty-state/empty-state";
import { Page } from "app/components/page/page";
import { DELETE_BOOK } from "app/queries/delete-book";
import { GET_BOOKS } from "app/queries/get-books";
import { Book } from "app/types";
import React, { useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function BooksPage(props: React.PropsWithChildren) {
  const navigate = useNavigate();

  const {
    isOpen: isConfirmingSignOut,
    onOpen: onConfirmSignOut,
    onClose: onConfirmSignOutClose,
  } = useDisclosure();
  const confirmSignOutCloseRef = useRef(null);
  const { logout } = useAuth0();
  const [query, setQuery] = useState("");
  const { data } = useQuery<{ books: Book[] }>(GET_BOOKS, {
    variables: {
      s: query,
    },
  });
  // { data: deleteMessage, error: deleteError }
  const [deleteBook] = useMutation<{ delete: string }>(DELETE_BOOK, {
    update: (cache, message, { variables }) => {
      const id = cache.identify({ id: variables?.id, __typename: "Book" });
      cache.evict({ id });
      cache.gc();
    },
  });

  const {
    isOpen: isConfirmingDelete,
    onOpen: onConfirmDelete,
    onClose: onConfirmDeleteClose,
  } = useDisclosure();
  const confirmDeleteCloseRef = useRef(null);
  const bookToDeleteId = useRef<null | number>(null);

  const newBookHandler = () => {
    navigate("/new");
  };
  const editBookHandler = (id: string | number) => {
    navigate(`${id}/edit`);
  };

  const deleteBookHandler = (id: number) => {
    deleteBook({ variables: { id } });
  };

  const confirmDelete = (
    <ConfirmAction
      title="Delete book"
      body={<Text>Are you sure you want to delete this book?</Text>}
      leftAction={
        <Button
          ref={confirmDeleteCloseRef}
          variant="outline"
          onClick={onConfirmDeleteClose}
        >
          Cancel
        </Button>
      }
      rightAction={
        <Button
          variant="solid"
          colorScheme="red"
          onClick={() => {
            onConfirmDeleteClose();
            deleteBookHandler(bookToDeleteId.current!);
            bookToDeleteId.current = null;
          }}
        >
          Delete
        </Button>
      }
      onClose={onConfirmDeleteClose}
      isOpen={isConfirmingDelete}
      leastDestructiveRef={confirmDeleteCloseRef}
    />
  );
  const confirmSignOut = (
    <ConfirmAction
      title="Confirm Signout"
      body={<Text>Click the button below to sign out</Text>}
      leftAction={
        <Button
          ref={confirmSignOutCloseRef}
          variant="outline"
          onClick={onConfirmSignOutClose}
        >
          Cancel
        </Button>
      }
      rightAction={
        <Button
          variant="solid"
          colorScheme="red"
          onClick={() => {
            onConfirmSignOutClose();
            logout();
          }}
        >
          Signout
        </Button>
      }
      onClose={onConfirmSignOutClose}
      isOpen={isConfirmingSignOut}
      leastDestructiveRef={confirmSignOutCloseRef}
      isCentered={true}
    />
  );

  // eslint-disable-next-line
  const empty = (
    <EmptyState
      title="No books found"
      subtitle="click the button below to create one"
    >
      <Button
        hideBelow="md"
        colorScheme="brand"
        pr="8"
        pl="8"
        data-testid="new-book-button"
        onClick={newBookHandler}
      >
        New Book
      </Button>
    </EmptyState>
  );
  const rows = (data?.books ?? []).map(({ id, title, description }, index) => (
    <BookRow
      key={id}
      sn={index + 1}
      title={title}
      description={description}
      onDelete={() => {
        bookToDeleteId.current = id;
        onConfirmDelete();
      }}
      onEdit={() => {
        editBookHandler(id);
      }}
    ></BookRow>
  ));
  return (
    <Page
      display="flex"
      flexFlow="column"
      alignItems="stretch"
      justifyContent="start"
    >
      {/* Header */}
      <BookSearchBar
        onSearch={(query) => {
          setQuery(query);
        }}
        onNew={newBookHandler}
        onLogout={onConfirmSignOut}
        position="fixed"
        width="100%"
        top="0"
        zIndex="sticky"
        bgColor="white"
      ></BookSearchBar>
      {/* Body */}
      <Box bgColor="white" mt="72px" maxHeight="calc(100vh - 72px)">
        <TableContainer>
          <Table colorScheme="brand" size="lg" variant="striped">
            <Thead>
              <Tr>
                <Th>S/N</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>{rows}</Tbody>
          </Table>
        </TableContainer>
      </Box>
      {confirmSignOut}
      {confirmDelete}
      {/* Router outlet. The router outlet is for popups */}
      <Outlet />
    </Page>
  );
}
