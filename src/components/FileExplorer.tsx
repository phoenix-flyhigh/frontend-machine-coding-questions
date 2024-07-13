import { useState } from "react";
import { Tree } from "./Tree";
import { useTraverseTree } from "../hooks/useTraverseTree";

export interface Folder {
  id: number;
  name: string;
  isFolder: boolean;
  items: Folder[];
}

const FileExplorer = () => {
  const [tree, setTree] = useState<Folder>({
    name: "Files",
    id: 0,
    isFolder: true,
    items: [],
  });
  const { insertNode, editNode, deleteNode } = useTraverseTree();

  const addItem = (parentId: number, newNode: Folder) => {
    setTree(insertNode(tree, parentId, newNode));
  };

  const deleteItem = (id: number) => {
    setTree(deleteNode(tree, id));
  };

  const editItem = (id: number, text: string) => {
    setTree(editNode(tree, id, text));
  };

  return (
    <div className="w-2/5 min-h-48 border-2 rounded-2xl border-slate-400">
      <div className="flex p-3 text-lg">
        <Tree
          data={tree}
          addItem={addItem}
          deleteItem={deleteItem}
          editItem={editItem}
        />
      </div>
    </div>
  );
};

export default FileExplorer;
