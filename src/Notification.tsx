import { useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
interface NotificationProps {
  message: string;
  classList: string;
  onClose: () => void;
  duration: number;
}

export const Notification = ({
  message,
  classList,
  onClose,
  duration,
}: NotificationProps) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, duration);
  }, [onClose, duration]);

  const handleCancel = () => {
    onClose();
  };

  return (
    <section
      className={`${classList} flex justify-between px-4 py-3 text-white w-full`}
    >
      <div>{message}</div>
      <button onClick={handleCancel}>
        <RxCross2 />
      </button>
    </section>
  );
};
