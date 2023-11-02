import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ChakraProps, Flex, IconButton, Td, Tr } from "@chakra-ui/react";

export interface BookRowProps extends ChakraProps {
  sn: string | number;
  title: string;
  description: string;
  onDelete: () => void;
  onEdit: () => void;
  state?: "deleting" | "default";
}
export function BookRow({
  sn,
  title,
  description,
  onDelete,
  onEdit,
  state = "default",
}: BookRowProps) {
  return (
    <Tr>
      <Td>{sn}</Td>
      <Td>{title}</Td>
      <Td>{description}</Td>
      <Td>
        <Flex columnGap="3">
          <IconButton
            aria-label="Edit book"
            icon={<EditIcon />}
            onClick={onEdit}
            variant="ghost"
            isRound={true}
            disabled={state === "deleting"}
          ></IconButton>
          <IconButton
            aria-label="delete book"
            icon={<DeleteIcon />}
            onClick={onDelete}
            colorScheme="red"
            isRound={true}
            variant="ghost"
            isLoading={state === "deleting"}
          ></IconButton>
        </Flex>
      </Td>
    </Tr>
  );
}
