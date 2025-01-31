import { useState } from "react";
import "./FileExplorer.css";
import { explorerData, IFileStructure } from "./data";
import Folder from "./Folder";
import { useFolder } from "./useFolder";

export default function FileExplorer() {
  const { insertNode } = useFolder();
  const [explorer, setExplorer] = useState<IFileStructure>(explorerData);

  const handleAddNode = (id: string, name: string, isFolder: boolean) => {
    insertNode(explorer, id, name, isFolder);
  };
  const handleRemoveNode = (id: string) => {
    // insertNode(explorer, id, name, isFolder);
  };
  const handleUpdateNode = (id: string, name: string) => {
    // insertNode(explorer, id, name, isFolder);
  };

  return (
    <div className="file-explorer">
      <h2>FileExplorer</h2>
      <div className="file-explorer-container">
        <Folder
          data={explorer}
          addNode={handleAddNode}
          deleteNode={handleRemoveNode}
          updateNode={handleUpdateNode}
        />
      </div>
    </div>
  );
}
