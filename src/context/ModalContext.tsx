import { createContext, ReactNode, useState } from 'react';

export type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: (callback?: () => void) => void;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: (callback) => {
    if (callback) {
      callback();
    }
  },
});

type ModalProviderProps = {
  children: ReactNode;
};

export function ModalProvider<T = unknown>({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = (callback?: () => void) => {
    if (callback) {
      callback();
    }
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
