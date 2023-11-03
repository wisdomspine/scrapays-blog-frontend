import { useDisclosure, useToast } from "@chakra-ui/react";
import { useMutation } from "@apollo/client";
import { BookFormModal } from "app/components/book-form-modal/book-form-modal";
import { CREATE_BOOK } from "app/queries/create-book";
import { PropsWithChildren, useEffect } from "react";
import { Book } from "app/types";
import { GET_BOOKS } from "app/queries/get-books";
import { useScreenLoader } from "app/providers/screen-loader-provider";
import { useNavigate } from "react-router-dom";

export function NewBookPage(props: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { start, stop } = useScreenLoader();
  const toast = useToast();
  const navigate = useNavigate();

  const [createBook, { loading }] = useMutation<{ create: Book }>(CREATE_BOOK, {
    refetchQueries: [GET_BOOKS],
  });

  useEffect(() => {
    onOpen();
  });

  /**
   * Effect to show and hide screen loader
   */
  useEffect(() => {
    if (loading) {
      start();
    } else {
      stop();
    }
  }, [loading, start, stop]);

  const submitHandler = (title: string, description: string) => {
    createBook({
      variables: {
        data: {
          title,
          description,
        },
      },
      onCompleted() {
        stop();
        navigate("/");
        onClose();
        toast({
          description: "New book added successful",
          title: "Success",
          colorScheme: "green",
          position: "top-right",
        });
      },
    });
  };
  return (
    <BookFormModal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      description=""
      onSubmit={({ title, description }) => {
        submitHandler(title, description);
      }}
    />
  );
}
