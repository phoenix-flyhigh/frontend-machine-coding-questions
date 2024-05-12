import { Folder } from "./App";

const useTree = () => {
  const insertNode = (tree: Folder, node: Folder, parentFolderId: number) => {
    if (tree.id === parentFolderId) {
      tree.items.push(node);
      return tree;
    }
    const newItems: Folder[] = tree.items.map((item) =>
      insertNode(item, node, parentFolderId)
    );
    return { ...tree, items: newItems };
  };

  const editNode = (tree: Folder, id: number, newTitle: string) => {
    if (tree.id === id) {
      tree.name = newTitle;
      return tree;
    }
    const newItems: Folder[] = tree.items.map((item) =>
      editNode(item, id, newTitle)
    );
    return { ...tree, items: newItems };
  };

  const doesNameExistInTree = (tree: Folder, title: string) => {
    if (tree.name === title) return true;
    const newItems: (boolean | undefined)[] = tree.items.map((item) =>
      doesNameExistInTree(item, title)
    );
    return newItems.includes(true);
  };

  const deleteNode = (tree: Folder, id: number) => {
    if (tree.id === id) {
      return null;
    }
    const newItems: (Folder | null)[] = tree.items.map((item) =>
      deleteNode(item, id)
    );
    const filteredItems = newItems.filter((item) => item !== null) as Folder[];

    return { ...tree, items: filteredItems };
  };

  return { insertNode, editNode, doesNameExistInTree, deleteNode };
};

export default useTree;
