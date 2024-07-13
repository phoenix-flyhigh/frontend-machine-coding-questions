import { useState, useRef, useEffect } from "react";
import {
  FaFile,
  FaFolder,
  FaFolderOpen,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { Folder } from "./FileExplorer";
import { IconButton } from "./IconButton";

interface TreeProps {
  data: Folder;
  addItem: (parentId: number, newNode: Folder) => void;
  deleteItem: (id: number) => void;
  editItem: (id: number, text: string) => void;
}

export const Tree = ({ data, addItem, deleteItem, editItem }: TreeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNewItem, setShowNewItem] = useState(false);
  const [isNewFolder, setIsNewFolder] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const addInputRef = useRef<HTMLInputElement>(null);

  const { id, name, isFolder } = data;
  const isRoot = id === 0;

  useEffect(() => {
    showEditBox && editInputRef.current && editInputRef.current.focus();
  }, [showEditBox]);

  useEffect(() => {
    showNewItem && addInputRef.current && addInputRef.current.focus();
  }, [showNewItem]);

  const handleAddItem = (isFolder: boolean) => {
    setIsExpanded(true);
    setShowNewItem(true);
    setIsNewFolder(isFolder);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && textInput.trim().length) {
      addItem(id, {
        name: textInput.trim(),
        id: Date.now(),
        isFolder: isNewFolder,
        items: [],
      });
      setTextInput("");
      setIsNewFolder(false);
      setShowNewItem(false);
    }
  };

  const handleEdit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isEditing && e.key === "Enter" && textInput.trim().length) {
      editItem(id, textInput.trim());
      setTextInput("");
      setShowEditBox(false);
      setIsEditing(false);
    }
  };

  return (
    <div role="button" className="w-full flex-col gap-4" key={id}>
      <div
        className={`flex justify-between items-center ${
          isRoot ? "px-6 py-3 text-xl font-bold" : ""
        } ${
          isRoot && isExpanded && data.items.length
            ? "border-b-2 border-slate-400"
            : ""
        }`}
      >
        <div className="flex gap-2 items-center justify-start">
          {isFolder ? (
            isExpanded ? (
              <IconButton
                icon={isRoot ? <FaChevronUp /> : <FaFolderOpen />}
                handleClick={() => setIsExpanded((prev) => !prev)}
              />
            ) : (
              <IconButton
                icon={isRoot ? <FaChevronDown /> : <FaFolder />}
                handleClick={() => setIsExpanded((prev) => !prev)}
              />
            )
          ) : (
            <FaFile />
          )}
          {showEditBox ? (
            <input
              className="bg-slate-800 text-white outline-white border-none"
              ref={editInputRef}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyUp={handleEdit}
              onKeyDown={() => {
                !isEditing && setIsEditing(true);
              }}
              onBlur={() => {
                setShowEditBox(false);
                setTextInput("");
                setIsEditing(false);
              }}
            />
          ) : (
            name
          )}
        </div>
        <div className="flex gap-2 items-center">
          {isFolder && (
            <div className="flex gap-2 items-center">
              <IconButton
                icon={<FaFile />}
                handleClick={() => {
                  handleAddItem(false);
                }}
              />
              <IconButton
                icon={<FaFolder />}
                handleClick={() => {
                  handleAddItem(true);
                }}
              />
            </div>
          )}
          {!isRoot && (
            <div className="flex gap-2 items-center">
              <IconButton
                icon={<MdEdit />}
                handleClick={() => {
                  setShowEditBox(true);
                  setTextInput(name);
                }}
              />
              <IconButton
                icon={<MdDelete />}
                handleClick={() => deleteItem(data.id)}
              />
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="flex flex-col pl-8">
          {showNewItem && (
            <div className="flex gap-2 items-center justify-start">
              {isNewFolder ? (
                <IconButton
                  icon={<FaFolder />}
                  handleClick={() => setIsExpanded((prev) => !prev)}
                />
              ) : (
                <FaFile />
              )}
              <input
                ref={addInputRef}
                type="text"
                onKeyUp={handleSubmit}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="bg-slate-800 text-white outline-white border-none"
                onBlur={() => {
                  setTextInput("");
                  setIsNewFolder(false);
                  setShowNewItem(false);
                }}
              />
            </div>
          )}
          {data.items.map((item) => (
            <Tree
              data={item}
              addItem={addItem}
              deleteItem={deleteItem}
              editItem={editItem}
              key={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
