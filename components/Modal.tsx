import React from "react";

import {
  useFloating,
  useInteractions,
  useClick,
  useRole,
  useDismiss,
  useId,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
} from "@floating-ui/react-dom-interactions";

interface ModalProps {
  open?: boolean;
  render: (props: {
    close: () => void;
    labelId: string;
    descriptionId: string;
  }) => React.ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ render, open = false, onClose }) => {
  const { reference, floating, context } = useFloating({
    open,
    onOpenChange: onClose,
  });

  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useClick(context),
    useRole(context),
    useDismiss(context),
  ]);

  return (
    <FloatingPortal>
      {open && (
        <FloatingOverlay
          lockScroll
          className="bg-gray-300/50 grid place-items-center"
        >
          <FloatingFocusManager context={context}>
            <div
              {...getFloatingProps({
                ref: floating,
                "aria-labelledby": labelId,
                "aria-describedby": descriptionId,
              })}
            >
              {render({
                close: () => onClose && onClose(),
                labelId,
                descriptionId,
              })}
            </div>
          </FloatingFocusManager>
        </FloatingOverlay>
      )}
    </FloatingPortal>
  );
};

export default Modal;
