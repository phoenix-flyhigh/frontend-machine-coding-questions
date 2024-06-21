import { FaRegUser } from "react-icons/fa";
import Dialog from "./Dialog";
import { useEffect, useRef, useState } from "react";

export const AddUserDialog = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: (username: string | null) => void;
}) => {
  const [userToAdd, setUserToAdd] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Dialog>
      <Dialog.Header onClose={onCancel}>
        <div className="flex items-center gap-3">
          <FaRegUser />
          <h2 className="text-lg font-bold">New User</h2>
        </div>
      </Dialog.Header>
      <Dialog.Content>
        <label className="flex items-center gap-4 text-lg">
          <span>Enter name </span>
          <input
            ref={inputRef}
            type="text"
            value={userToAdd}
            onChange={(e) => setUserToAdd(e.target.value)}
            className="bg-gray-300 text-black rounded-lg border-2 border-blue-400 outline-none h-10 p-2"
          />
        </label>
      </Dialog.Content>
      <Dialog.Footer
        onCancel={onCancel}
        onConfirm={() => {
          onConfirm(userToAdd);
          setUserToAdd("");
        }}
      />
    </Dialog>
  );
};
