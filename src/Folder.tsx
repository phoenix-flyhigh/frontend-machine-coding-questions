import { useState } from "react";
import { Folder } from "./App";
import TitleForm from "./TitleForm";
import { MdDeleteOutline } from "react-icons/md";

interface FolderWrapperProps {
  folderData: Folder;
  handleInsert: (itemToAdd: Folder, parentFolderId: number) => void;
  handleEdit: (id: number, title: string) => void;
  handleDelete: (id: number) => void;
}

const FolderWrapper = ({
  folderData,
  handleInsert,
  handleEdit,
  handleDelete,
}: FolderWrapperProps) => {
  const initialAddItemState = {
    showInputBox: false,
    isFolder: true,
  };
  const { isFolder, id, name, items } = folderData;
  const [isExpanded, setIsExpanded] = useState(false);
  const [addItemState, setAddItemState] = useState(initialAddItemState);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [editText, setEditText] = useState(name);
  const [showEditBox, setShowEditBox] = useState(false);

  const addItem = (
    parentFolderId: number,
    title: string,
    isFolder: boolean
  ) => {
    const itemToAdd: Folder = {
      id: new Date().getTime(),
      name: title,
      isFolder,
      items: [],
    };
    handleInsert(itemToAdd, parentFolderId);
    setAddItemState(initialAddItemState);
    setIsExpanded(true);
  };

  const handleAddBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isFolder: boolean
  ) => {
    e.stopPropagation();
    setAddItemState({ showInputBox: true, isFolder });
  };

  const handleDeleteBtnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleDelete(id);
  };

  if (!folderData) return <></>;

  return (
    <div>
      {isFolder ? (
        <>
          <div
            role="button"
            className="bg-gray-800 flex gap-6 justify-between w-full items-center px-3 py-2 cursor-pointer"
            onClick={() => setIsExpanded((prev) => !prev)}
            onDoubleClick={() => setShowEditBox(true)}
          >
            {showEditBox ? (
              <TitleForm
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => {
                  setShowEditBox(false);
                  setEditText(name);
                }}
                onSubmit={() => {
                  handleEdit(id, editText);
                  setShowEditBox(false);
                }}
                isFolder={addItemState.isFolder}
              />
            ) : (
              <span>📁 {name}</span>
            )}
            <div className="flex gap-3">
              <button
                className="px-3 py-1 text-black bg-slate-400"
                onClick={(e) => {
                  handleAddBtnClick(e, true);
                }}
              >
                Folder +
              </button>
              <button
                className="px-3 py-1 text-black bg-slate-400"
                onClick={(e) => handleAddBtnClick(e, false)}
              >
                File +
              </button>
              <button
                className={` ${
                  id === 1 ? "hidden" : "block"
                } px-3 py-1 text-black bg-slate-400`}
                onClick={(e) => handleDeleteBtnClick(e)}
              >
                <MdDeleteOutline />
              </button>
            </div>
          </div>
          <div className="pl-12 my-2">
            {addItemState.showInputBox && (
              <TitleForm
                value={newItemTitle}
                onChange={(e) => setNewItemTitle(e.target.value)}
                onBlur={() => setAddItemState(initialAddItemState)}
                onSubmit={() => {
                  addItem(id, newItemTitle, addItemState.isFolder);
                  setNewItemTitle("");
                }}
                isFolder={addItemState.isFolder}
              />
            )}
            {isExpanded &&
              items.map((item) => (
                <FolderWrapper
                  folderData={item}
                  handleInsert={handleInsert}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  key={item.id}
                />
              ))}
          </div>
        </>
      ) : (
        <button
          className="bg-gray-800 flex gap-6 justify-between w-full my-2 items-center px-3 py-2"
          onDoubleClick={() => setShowEditBox(true)}
        >
          {showEditBox ? (
            <TitleForm
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => {
                setShowEditBox(false);
                setEditText(name);
              }}
              onSubmit={() => {
                handleEdit(id, editText);
                setShowEditBox(false);
              }}
              isFolder={addItemState.isFolder}
            />
          ) : (
            <span>📄 {name}</span>
          )}
          <button
            className={` ${
              id === 1 ? "hidden" : "block"
            } px-3 py-1 text-black bg-slate-400`}
            onClick={(e) => handleDeleteBtnClick(e)}
          >
            <MdDeleteOutline />
          </button>
        </button>
      )}
    </div>
  );
};

export default FolderWrapper;
