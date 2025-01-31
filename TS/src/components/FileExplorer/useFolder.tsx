import { IFileStructure } from "./data";

export function useFolder() {
  const insertNode = (
    tree: IFileStructure,
    id: string,
    name: string,
    isFolder: boolean
  ): IFileStructure => {
    if (tree.id === id) {
      return {
        ...tree,
        items: [
          {
            id: new Date().toISOString(),
            name,
            isFolder,
            items: [],
          },
          ...tree.items,
        ],
      };
    }

    return {
      ...tree,
      items: tree.items.map((data) => insertNode(data, id, name, isFolder)),
    };
  };

  const updateNode = (
    tree: IFileStructure,
    id: string,
    name: string
  ): IFileStructure => {
    if (tree.id === id) {
      return {
        ...tree,
        name,
      };
    }

    return {
      ...tree,
      items: tree.items.map((data) => updateNode(data, id, name)),
    };
  };

  const deleteNode = (
    tree: IFileStructure,
    parentId: string,
    id: string
  ): IFileStructure => {
    if (tree.id === parentId) {
      return {
        ...tree,
        items: tree.items.filter((item) => item.id === id),
      };
    }

    return {
      ...tree,
      items: tree.items.map((data) => deleteNode(data, parentId, id)),
    };
  };
  return { insertNode };
}
