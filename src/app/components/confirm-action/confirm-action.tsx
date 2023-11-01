import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogProps,
  Flex,
} from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

export interface ConfirmActionProps extends Omit<AlertDialogProps, "children"> {
  rightAction: ReactElement;
  title: ReactNode;
  leftAction?: ReactElement;
  body?: ReactNode;
}
export function ConfirmAction({
  rightAction,
  title,
  leftAction,
  body,
  ...otherProps
}: ConfirmActionProps) {
  return (
    <AlertDialog {...otherProps}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          {body && <AlertDialogBody>{body}</AlertDialogBody>}
          <AlertDialogFooter>
            <Flex flexFlow="row" justifyContent="flex-end" columnGap="4">
              {leftAction}
              {rightAction}
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
