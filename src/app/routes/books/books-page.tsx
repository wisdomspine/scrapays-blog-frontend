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
import React, { useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function BooksPage(props: React.PropsWithChildren) {
  const navigate = useNavigate();

  const newBookHandler = () => {
    navigate("/new");
  };
  const {
    isOpen: isConfirmingSignOut,
    onOpen: onConfirmSignOut,
    onClose: onConfirmSignOutClose,
  } = useDisclosure();
  const confirmSignOutCloseRef = useRef(null);

  const {
    isOpen: isConfirmingDelete,
    onOpen: onConfirmDelete,
    onClose: onConfirmDeleteClose,
  } = useDisclosure();
  const confirmDeleteCloseRef = useRef(null);

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
          onClick={onConfirmDeleteClose}
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
          onClick={onConfirmSignOutClose}
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

  return (
    <Page
      display="flex"
      flexFlow="column"
      alignItems="stretch"
      justifyContent="start"
    >
      {/* Header */}
      <BookSearchBar
        onSearch={(query) => {}}
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
            <Tbody>
              <BookRow
                sn="1"
                title="The agony of tom sawer"
                description="random description"
                onDelete={onConfirmDelete}
                onEdit={() => {}}
              ></BookRow>
            </Tbody>
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
