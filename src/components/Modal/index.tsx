import { ReactNode, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

type Props = {
  children: ReactNode;
  id: string;
  open: boolean;
  // add disableClickOutside
  disableClickOutside?: boolean;
  //add onClose event so that we can close the modal from inside the component
  onClose(): void;
  closedChildren: ReactNode;
  modalAction: ReactNode;
  title?: string;
  description?: string;
};
export default function ControlledModal({
  id,
  children,
  disableClickOutside,
  open,
  onClose,
  modalAction,
  closedChildren,
  title,
  description,
}: Props) {
  const ref = useRef(null);
  useOnClickOutside(ref, () => {
    if (!disableClickOutside) {
      onClose();
    }
  });

  if (!open) {
    return <>{closedChildren}</>;
  }

  return (
    <Dialog
      id={id}
      open={open}
      onClose={() => onClose()}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          {title && <DialogTitle className="font-bold">{title}</DialogTitle>}
          {description && <Description>{description}</Description>}
          {children}
          {modalAction}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
