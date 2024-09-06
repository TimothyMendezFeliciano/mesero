import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useState } from 'react';

export type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: (callback?: () => void) => void;
  callback: () => Promise<void> | void | undefined;
  setCallback: Dispatch<SetStateAction<() => Promise<void> | void | undefined>>;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {
  },
  closeModal: (callback) => {
    if (callback) {
      callback();
    }
  },
  callback: undefined,
  setCallback: () => {
  },
});

type ModalProviderProps = {
  children: ReactNode;
};

export function ModalProvider<T = unknown>({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<() => undefined>(() => undefined);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = useCallback(async () => {
    console.log('Is there a callback?', callback);
    // TODO: Make sure this runs.
    if (callback) {
      callback();
    }
    setIsOpen(false);
  }, [callback]);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        setCallback,
        callback,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
