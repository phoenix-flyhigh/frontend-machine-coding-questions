import { ReactNode } from "react";
import { Folder } from "./FileExplorer";

interface IconButtonProps {
  icon: ReactNode;
  handleClick: () => void | ((parentId: number, newNode: Folder) => void);
}

export const IconButton = ({ icon, handleClick }: IconButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
    >
      {icon}
    </button>
  );
};
