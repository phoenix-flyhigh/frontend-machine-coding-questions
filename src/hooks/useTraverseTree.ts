import { Folder } from "../components/FileExplorer";

export const useTraverseTree = () => {
  const insertNode = (tree: Folder, parentId: number, newNode: Folder) => {
    if (tree.id === parentId) {
      tree.items.unshift(newNode);
      return tree;
    }
    const newItems: Folder[] = tree.items.map((item) =>
      insertNode(item, parentId, newNode)
    );

    return {
      ...tree,
      items: newItems,
    };
  };

  const deleteNode = (tree: Folder, id: number) => {
    if (tree.isFolder && tree.items.some((x) => x.id === id)) {
      const newItems = tree.items.filter((x) => x.id !== id);
      return {
        ...tree,
        items: newItems,
      };
    }
    const newItems: Folder[] = tree.items.map((item) => deleteNode(item, id));

    return {
      ...tree,
      items: newItems,
    };
  };

  const editNode = (tree: Folder, id: number, text: string) => {
    if (tree.id === id) {
      return {
        ...tree,
        name: text,
      };
    }
    const newItems: Folder[] = tree.items.map((item) =>
      editNode(item, id, text)
    );

    return {
      ...tree,
      items: newItems,
    };
  };

  return {
    insertNode,
    editNode,
    deleteNode,
  };
};
