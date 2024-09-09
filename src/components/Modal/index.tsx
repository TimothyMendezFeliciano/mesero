import { createContext, Fragment, ReactNode, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { useModalContext } from '../../hooks/useModalContext';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

type Props = {
  children: ReactNode;
  id: string;
  // add disableClickOutside
  disableClickOutside?: boolean;
  //add onClose event so that we can close the modal from inside the component
  triggerButtonContent: ReactNode;
  closeButtonContent: ReactNode;
  title?: string;
  description?: string;
};

export function ControlledModal({
  id,
  children,
  disableClickOutside,
  triggerButtonContent,
  closeButtonContent,
  title,
  description,
}: Props) {
  const ref = useRef(null);

  const { isOpen, closeModal, openModal } = useModalContext();

  useOnClickOutside(ref, () => {
    if (!disableClickOutside) {
      closeModal();
    }
  });

  if (!isOpen) {
    return <ModalTriggerButton>{triggerButtonContent}</ModalTriggerButton>;
  }

  return (
    <Dialog
      id={id}
      open={isOpen}
      onClose={() => closeModal()}
      className="relative z-50 flex flex-grow"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          {title && <DialogTitle className="font-bold">{title}</DialogTitle>}
          {description && <Description>{description}</Description>}
          {children}
          <CloseTriggerButton>{closeButtonContent}</CloseTriggerButton>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

function CloseTriggerButton({ children }) {
  const { closeModal } = useModalContext();
  return (
    <div className={'modal-action'}>
      <button className={'btn'} onClick={() => closeModal()} type={'submit'}>
        {children}
      </button>
    </div>
  );
}

function ModalTriggerButton({ children }) {
  const { openModal } = useModalContext();

  return (
    <Fragment>
      <button className={'btn btn-secondary'} onClick={openModal}>
        {children}
      </button>
    </Fragment>
  );
}
