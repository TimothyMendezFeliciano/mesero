import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { types } from 'util';

export type ModalContextType = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  callback: (() => Promise<void> | void) | undefined;
  setCallback: Dispatch<
    SetStateAction<(() => Promise<void> | void) | undefined>
  >;
};

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => undefined,
  closeModal: () => undefined,
  callback: undefined,
  setCallback: () => undefined,
});

type ModalProviderProps = {
  children: ReactNode;
};

export function ModalProvider<T = unknown>({ children }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [callback, setCallback] = useState<
    (() => Promise<void> | void) | undefined
  >(undefined);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = useCallback(async () => {
    if (callback && typeof callback === 'function') {
      if (types.isAsyncFunction(callback)) {
        callback();
      } else {
        await callback();
      }
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
