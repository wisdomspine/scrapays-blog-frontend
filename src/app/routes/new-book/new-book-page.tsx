import { useDisclosure } from "@chakra-ui/react";
import { BookFormModal } from "app/components/book-form-modal/book-form-modal";
import { PropsWithChildren, useEffect } from "react";

export function NewBookPage(props: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  });
  return (
    <BookFormModal isOpen={isOpen} onClose={onClose} onSubmit={() => {}} />
  );
}
