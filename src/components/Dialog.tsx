import { ReactNode } from "react";
import { CancelIcon } from "./CancelIcon";

const Dialog = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute z-10 flex flex-col items-start w-96">
      {children}
    </div>
  );
};

Dialog.Header = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div className="bg-gray-300 text-black px-4 py-2 flex justify-between w-full">
      {children}
      <CancelIcon onClick={onClose} />
    </div>
  );
};

Dialog.Content = ({ children }: { children: ReactNode }) => {
  return <div className="px-4 py-2 bg-white text-black w-full">{children}</div>;
};

Dialog.Footer = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <div className="flex gap-4 items-center justify-end bg-gray-300 text-black w-full px-4 py-2">
      <button
        className="px-4 py-2 bg-white text-black text-md"
        onClick={onCancel}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 bg-white text-blue-600 text-md"
        onClick={onConfirm}
      >
        Confirm
      </button>
    </div>
  );
};

export default Dialog;
