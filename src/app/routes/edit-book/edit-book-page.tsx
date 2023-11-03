import { useMutation, useQuery } from "@apollo/client";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { BookFormModal } from "app/components/book-form-modal/book-form-modal";
import { useScreenLoader } from "app/providers/screen-loader-provider";
import { GET_BOOK } from "app/queries/get-book";
import { GET_BOOKS } from "app/queries/get-books";
import { UPDATE_BOOK } from "app/queries/update-book";
import { Book } from "app/types";
import { PropsWithChildren, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function EditBookPage(props: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { start, stop } = useScreenLoader();
  const navigate = useNavigate();
  const [updateBook, { loading: isSubmitting }] = useMutation<{ create: Book }>(
    UPDATE_BOOK,
    {
      refetchQueries: [GET_BOOKS],
    }
  );
  const params = useParams();
  const id = Number.parseInt(params.id!);
  const { data, loading: isFetching } = useQuery<{ book: Book }>(GET_BOOK, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    onOpen();
  });

  /**
   * Effect to show and hide screen loader
   */
  useEffect(() => {
    if (isFetching || isSubmitting) {
      start();
    } else {
      stop();
    }
  }, [isFetching, isSubmitting, start, stop]);

  const submitHandler = (title: string, description: string) => {
    updateBook({
      variables: {
        id,
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
          description: "Book has been updated successfully",
          title: "Success",
          colorScheme: "green",
          position: "top-right",
        });
      },
    });
  };
  return (
    <>
      {!isFetching && (
        <BookFormModal
          title={data?.book?.title}
          description={data?.book?.description}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={({ title, description }) => {
            submitHandler(title, description);
          }}
        />
      )}
    </>
  );
}
