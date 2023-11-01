import { useDisclosure } from "@chakra-ui/react";
import { BookFormModal } from "app/components/book-form-modal/book-form-modal";
import { PropsWithChildren, useEffect } from "react";

export function EditBookPage(props: PropsWithChildren) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
  });
  return (
    <BookFormModal
      title="The agony of Tom Sawer"
      description="random description"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={() => {}}
    />
  );
}
