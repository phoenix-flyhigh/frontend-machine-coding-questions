import { CiWarning } from "react-icons/ci";
import Dialog from "./Dialog";

export const RemoveUserDialog = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Dialog>
      <Dialog.Content>
        <p className="flex items-center text-md gap-3">
          <CiWarning />
          Are you sure you want to remove this user ?
        </p>
      </Dialog.Content>
      <Dialog.Footer onCancel={onCancel} onConfirm={onConfirm} />
    </Dialog>
  );
};
