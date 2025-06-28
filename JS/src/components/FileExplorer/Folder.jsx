import React, { useState } from "react";
import "./Folder.css";

export const Folder = ({
  explorer,
  addNode = () => {},
  deleteNode = () => {},
  updateNode = () => {},
  parentID = 0,
}) => {
  const [isExpand, setExpand] = useState(true);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  const handleShowInput = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  const handleAddNode = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      addNode(explorer.id, showInput.isFolder, e.target.value);
      setShowInput({ visible: false, isFolder: false });
    }
  };
  const handleDeleteNode = (e, id, parentId) => {
    e.stopPropagation();
    deleteNode(id, parentId);
  };
  const handleUpdateNode = (e, id, parentId, name) => {
    e.stopPropagation();
    // deleteNode(id, parentId);
  };

  if (explorer.isFolder) {
    return (
      <div className="folder-container">
        <div className="folder-header" onClick={() => setExpand(!isExpand)}>
          <span>📁 {explorer.name}</span>
          <div className="btn-container">
            <button className="btn" onClick={(e) => handleShowInput(e, true)}>
              Folder +
            </button>
            <button className="btn" onClick={(e) => handleShowInput(e, false)}>
              File +
            </button>
            <button
              className="btn"
              onClick={(e) => handleDeleteNode(e, explorer.id, parentID)}
            >
              Delete +
            </button>
          </div>
        </div>
        <div
          style={{ paddingLeft: "15px", display: isExpand ? "block" : "none" }}
        >
          {showInput.visible && (
            <div>
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                autoFocus
                onKeyDown={handleAddNode}
                onBlur={() => setShowInput({ ...showInput, isFolder: false })}
              />
            </div>
          )}
          {Array.isArray(explorer.items) &&
            explorer.items.map((item) => {
              // console.log(explorer.id, parentID);
              return (
                <Folder
                  explorer={item}
                  addNode={addNode}
                  deleteNode={deleteNode}
                  key={item.id}
                  parentID={explorer.id}
                />
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file-header">
        <span>📄 {explorer.name}</span>
        <div className="btn-container">
          <button
            className="btn"
            onClick={(e) => handleDeleteNode(e, explorer.id, parentID)}
          >
            Delete +
          </button>
        </div>
      </div>
    );
  }
};
