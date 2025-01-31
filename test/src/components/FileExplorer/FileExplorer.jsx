import React, { useState } from "react";
import "./FileExplorer.css";
import { explorerData } from "./data";
import { Folder } from "./Folder";
import { useTraverseTree } from "./useTraverseTree";

export const FileExplorer = () => {
  const [explorer, setExplorer] = useState(explorerData);
  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleAddNode = (id, isFolder, name) => {
    const tree = insertNode(explorer, id, isFolder, name);
    setExplorer(tree);
  };
  const handleRemoveNode = (id, parentID) => {
    const tree = deleteNode(explorer, id, parentID);
    setExplorer(tree);
  };
  const handleUpdateNode = (id, parentID, name) => {
    // console.log(id, parentID);
    const tree = deleteNode(explorer, id, parentID, name);
    setExplorer(tree);
  };

  return (
    <div className="fileexplorer">
      <Folder
        explorer={explorer}
        addNode={handleAddNode}
        deleteNode={handleRemoveNode}
        updateNode={handleUpdateNode}
      />
    </div>
  );
};
