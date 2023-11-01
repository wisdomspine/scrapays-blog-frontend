import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useDisclosure,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/react";
import { ConfirmAction } from "app/components/confirm-action/confirm-action";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface BookFormModalProps extends Omit<ModalProps, "children"> {
  title?: string;
  description?: string;
  onSubmit: (
    data: Required<Pick<BookFormModalProps, "title" | "description">>
  ) => void;
}
export function BookFormModal({
  title: initialTitle,
  description: initialDescription,
  onSubmit,
  ...otherProps
}: BookFormModalProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const titleRef = useRef(null);
  const {
    isOpen: isConfirmingClose,
    onOpen: openConfirmCloseDialog,
    onClose: closeConfirmCloseDialog,
  } = useDisclosure();
  const preventFormCloseRef = useRef(null);

  const descriptionError = getDescriptionError(description);
  const titleError = getTitleError(title);
  const isValid = !descriptionError && !titleError;
  const isEditing = !!initialTitle && !!initialDescription;
  const isTitleTouched = !(title === initialTitle);
  const isDescriptionTouched = !(description === initialDescription);
  const isFormTouched = isTitleTouched || isDescriptionTouched;

  const closeModal = () => {
    otherProps.onClose();
    navigate("/");
  };
  const closeHandler = () => {
    if (isFormTouched) {
      openConfirmCloseDialog();
    } else {
      closeModal();
    }
  };

  const confirmClose = (
    <ConfirmAction
      title="Discard changes"
      body={
        <Text>
          Confirm that you want to close this form. Changes will be lost
        </Text>
      }
      leftAction={
        <Button
          ref={preventFormCloseRef}
          variant="outline"
          onClick={closeConfirmCloseDialog}
        >
          Cancel
        </Button>
      }
      rightAction={
        <Button
          variant="solid"
          colorScheme="red"
          onClick={() => {
            closeConfirmCloseDialog();
            closeModal();
          }}
        >
          Discard
        </Button>
      }
      onClose={closeConfirmCloseDialog}
      isOpen={isConfirmingClose}
      leastDestructiveRef={preventFormCloseRef}
    />
  );
  return (
    <>
      <Modal
        isCentered
        {...otherProps}
        closeOnEsc={false}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as="h1">
            {isEditing ? "Edit book" : "Add book"}
          </ModalHeader>
          <ModalCloseButton onClick={closeHandler} />
          <ModalBody>
            <Stack>
              {/* title form field */}
              <FormControl
                isInvalid={isTitleTouched && !!titleError}
                isRequired
              >
                <FormLabel>Title</FormLabel>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter title here"
                  ref={titleRef}
                  value={title}
                />
                <FormErrorMessage> {titleError} </FormErrorMessage>
              </FormControl>

              {/* Description control */}
              <FormControl
                isInvalid={isDescriptionTouched && !!descriptionError}
                isRequired
              >
                <FormLabel>Description</FormLabel>
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Describe the book"
                >
                  {description}
                </Textarea>
                <FormErrorMessage> {descriptionError} </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeHandler} variant="outline" colorScheme="red">
              Cancel
            </Button>
            <Button
              onClick={() =>
                onSubmit({ title: title!, description: description! })
              }
              variant="solid"
              colorScheme="brand"
              ml="4"
              isDisabled={!isValid}
            >
              {isEditing ? "Update" : "Submit"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {confirmClose}
    </>
  );
}

function getTitleError(title: BookFormModalProps["title"]) {
  title = title?.trim();
  if (title == null) {
    return "Title is required";
  } else if (title.length < 2) {
    return "Title must have at least 2 characters";
  } else {
    return null;
  }
}
function getDescriptionError(description: BookFormModalProps["description"]) {
  description = description?.trim();
  if (description == null) {
    return "Description is required";
  } else if (description.length < 16) {
    return "Description must have at least 16 characters";
  } else {
    return null;
  }
}
