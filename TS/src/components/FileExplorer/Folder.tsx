import React, { useState } from "react";
import { IFileStructure } from "./data";

interface IFolderProps {
  data: IFileStructure;
  addNode: (id: string, name: string, isFolder: boolean) => void;
  deleteNode: (id: string) => void;
  updateNode: (id: string, name: string) => void;
}
export default function Folder({
  data,
  addNode,
  deleteNode,
  updateNode,
}: IFolderProps) {
  const { id, isFolder, items, name } = data;

  const [isExtend, setExtend] = useState<boolean>(false);
  const [inputMode, setInputMode] = useState<boolean>(false);
  const [selectFolder, setSelectFolder] = useState<boolean>(false);
  const [dataName, setDataName] = useState<string>("");

  const handleExpand = () => {
    setExtend(!isExtend);
  };
  const handleOpenFolderInput = (event: any) => {
    event.stopPropagation();
    // set
    setExtend(true);
    setInputMode(true);
  };
  const handleAddNode = (event: any) => {};

  if (isFolder) {
    return (
      <div className="file">
        <div className="folder-header" onClick={handleExpand}>
          <span>📁{name}</span>
          <span className="flex-center" style={{ gap: "5px" }}>
            <button onClick={handleOpenFolderInput}>Folder +</button>
            <button>File +</button>
            <button>Delete +</button>
          </span>
        </div>
        <div
          className=""
          style={{ paddingLeft: "10px", display: isExtend ? "block" : "none" }}
        >
          {inputMode && (
            <div>
              <span>{selectFolder ? "📁" : "📄"}</span>
              <input
                value={dataName}
                onChange={(e) => setDataName(e.target.value)}
                onKeyDown={handleAddNode}
              />
            </div>
          )}
          {items.map((data) => (
            <Folder
              key={data.id}
              data={data}
              addNode={addNode}
              deleteNode={deleteNode}
              updateNode={updateNode}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        <div className="file-header">
          <span>📄{name}</span>
          <span>
            <button>Folder +</button>
            <button>File +</button>
            <button>Delete +</button>
          </span>
        </div>
      </div>
    );
  }
}
