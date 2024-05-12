import explorer from "./FolderData";
import useTree from "./useTree";
import FolderWrapper from "./Folder";
import { useState } from "react";

export interface Folder {
  id: number;
  name: string;
  isFolder: boolean;
  items: Folder[];
}

function App() {
  const [folderData, setFolderData] = useState<Folder | null>(explorer);

  const { insertNode, editNode, doesNameExistInTree, deleteNode } = useTree();

  const handleError = () => {
    alert("File or folder with same name exists already");
  };

  const handleInsert = (itemToAdd: Folder, parentFolderId: number) => {
    if (!folderData) return;

    if (doesNameExistInTree(folderData, itemToAdd.name)) {
      handleError();
      return;
    }
    const newStructure = insertNode(folderData, itemToAdd, parentFolderId);
    setFolderData(newStructure);
  };
  const handleEdit = (id: number, title: string) => {
    if (!folderData) return;
    if (doesNameExistInTree(folderData, title)) {
      handleError();
      return;
    }
    const newStructure = editNode(folderData, id, title);
    setFolderData(newStructure);
  };

  const handleDelete = (id: number) => {
    if (!folderData) return;
    const newStructure = deleteNode(folderData, id);
    setFolderData(newStructure);
  };

  return (
    <div className="bg-black h-screen w-full flex justify-center pt-5 text-white text-lg items-start">
      <div className="w-1/2">
        {folderData && (
          <FolderWrapper
            folderData={folderData}
            handleInsert={handleInsert}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;
