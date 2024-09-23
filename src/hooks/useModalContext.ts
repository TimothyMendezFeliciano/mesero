import { useContext } from 'react';
import { ModalContext, ModalContextType } from '../context/ModalContext';

export function useModalContext() {
  const context = useContext<ModalContextType>(ModalContext)

  if(!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context
}