import { useEffect, useRef, useState } from "react";
import { CancelIcon } from "./CancelIcon";
import { RemoveUserDialog } from "./RemoveUserDialog";
import { AddUserDialog } from "./AddUserDialog";
import "../App.css";
import { getRandomColor } from "../utils";

export const UserAvatars = () => {
  const [users, setUsers] = useState(["Sowmya", "Meredith"]);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [userToRemove, setUserToRemove] = useState<string | null>(null);

  const removeUser = (username: string) => {
    setUsers((prev) => prev.filter((x) => x !== username));
    delete userColors.current[username];
  };

  const userColors = useRef<{ [key: string]: string }>({});

  useEffect(() => {
    users.forEach((user) => {
      if (!userColors.current[user]) {
        userColors.current[user] = getRandomColor();
      }
    });
  }, [users]);

  if (Object.keys(userColors.current).length === 0) {
    users.forEach((user) => {
      userColors.current[user] = getRandomColor();
    });
  }

  return (
    <div
      className={`relative flex justify-center items-center w-full h-screen `}
    >
      {showRemoveDialog && (
        <RemoveUserDialog
          onCancel={() => setShowRemoveDialog(false)}
          onConfirm={() => {
            userToRemove && removeUser(userToRemove);
            setShowRemoveDialog(false);
            setUserToRemove(null);
          }}
        />
      )}
      {showAddDialog && (
        <AddUserDialog
          onCancel={() => setShowAddDialog(false)}
          onConfirm={(userToAdd: string | null) => {
            if (userToAdd) {
              setUsers((prev) => [...prev, userToAdd]);
              userColors.current[userToAdd] = getRandomColor();
            }
            setShowAddDialog(false);
          }}
        />
      )}
      <div
        className={`flex gap-8 items-center ${
          showRemoveDialog || showAddDialog
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
      >
        {users.map((x) => (
          <div
            key={x}
            className={`relative circle-btn ${userColors.current[x]}`}
          >
            <CancelIcon
              onClick={() => {
                setShowRemoveDialog(true);
                setUserToRemove(x);
              }}
            />
            {x[0].toUpperCase()}
          </div>
        ))}
        <button
          className={`bg-white text-black circle-btn`}
          onClick={() => setShowAddDialog(true)}
        >
          +
        </button>
      </div>
    </div>
  );
};
