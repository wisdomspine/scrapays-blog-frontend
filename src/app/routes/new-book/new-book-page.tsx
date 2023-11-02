import { useDisclosure } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { BookFormModal } from "app/components/book-form-modal/book-form-modal";
import { CREATE_BOOK } from "app/queries/create-book";
import { PropsWithChildren, useEffect } from "react";
import { Book } from "app/types";
import { GET_BOOKS } from "app/queries/get-books";

export function NewBookPage(props: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createBook] = useMutation<{ create: Book }>(CREATE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  useEffect(() => {
    onOpen();
  });
  const submitHandler = (title: string, description: string) => {
    createBook({
      variables: {
        data: {
          title,
          description,
        },
      },
    });
  };
  return (
    <BookFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={({ title, description }) => {
        submitHandler(title, description);
      }}
    />
  );
}
