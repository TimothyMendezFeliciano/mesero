import { ReactElement, ReactNode, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

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
};
export default function ControlledModal({
  id,
  children,
  disableClickOutside,
  open,
  onClose,
  modalAction,
  closedChildren,
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
    <dialog id={id} className={'modal'}>
      <div className={'modal-box'}>
        {children}
        <div className={'modal-action'}>{modalAction}</div>
      </div>
    </dialog>
  );
}
