export const useTraverseTree = () => {
  const insertNode = (tree, id, isFolder, name) => {
    if (id === tree.id) {
      tree.items.unshift({
        id: new Date().getTime(),
        name,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];

    latestNode = tree.items.map((itemData) => {
      return insertNode(itemData, id, isFolder, name);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, id, parentID) => {
    if (tree.id == parentID) {
      let updateItems = tree.items.filter((item) => id != item.id);

      return { ...tree, items: updateItems };
    }

    let lastestNode = tree.items.map((itemData) => {
      return deleteNode(itemData, id, parentID);
    });

    return { ...tree, items: lastestNode };
  };

  const updateNode = (tree, id, parentID, name) => {
    if (tree.id == parentID) {
      let updateItems = tree.items.filter((item) => {
        let data = item;
        if (item.id === id) data.name = name;
        return data;
      });

      return { ...tree, items: updateItems };
    }

    let lastestNode = tree.items.map((itemData) => {
      return deleteNode(itemData, id, parentID, name);
    });

    return { ...tree, items: lastestNode };
  };

  return { insertNode, deleteNode, updateNode };
};
