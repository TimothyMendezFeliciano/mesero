import { ReactNode, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Description,
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
    <Dialog open={open} onClose={() => onClose()} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
          <DialogTitle className="font-bold">Deactivate account</DialogTitle>
          {title && <Description>{title}</Description>}
          {children}
          {modalAction}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
