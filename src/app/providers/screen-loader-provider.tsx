import { Modal, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { PropsWithChildren, createContext, useContext } from "react";

export interface ScreenLoadActions {
  start: () => void;
  stop: () => void;
}
const screenLoaderActions = createContext<ScreenLoadActions>(
  null as unknown as ScreenLoadActions
);

/**
 * Provider for showing spinner on the whole screen, useful during navigation and submit actions
 * @param param0
 * @returns
 */
export function ScreenLoaderProvider({ children }: PropsWithChildren) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  /**
   * show modal with spinner
   */
  const start = () => {
    onOpen();
  };

  /**
   * hide modal and spinner
   */
  const stop = () => {
    onClose();
  };
  return (
    <>
      <screenLoaderActions.Provider value={{ start, stop }}>
        {children}
      </screenLoaderActions.Provider>

      <Modal
        isOpen={isOpen}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        isCentered={true}
        onClose={onClose}
      >
        <ModalOverlay
          display="flex"
          flexFlow="row"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            colorScheme="brand"
            size="lg"
            thickness="3px"
            color="brand"
          />
        </ModalOverlay>
      </Modal>
    </>
  );
}

export function useScreenLoader() {
  return useContext(screenLoaderActions);
}
