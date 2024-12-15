import React, { useCallback, useState } from "react";
import "./SelectableGrid.css";

export const SelectableGrid = ({ rows = 10, cols = 10 }) => {
  const [selectBoxes, setSelectBoxes] = useState([]);
  const [isMouseDown, setMouseDown] = useState(false);

  const handleMouseDown = (index) => {
    setMouseDown(true);
    setSelectBoxes([index]);
  };

  const handleMouseEnter = useCallback(
    (index) => {
      if (isMouseDown) {
        const startBox = selectBoxes[0];
        const endBox = index;

        const startRow = Math.floor((startBox - 1) / cols);
        const startCol = (startBox - 1) % cols;
        const endRow = Math.floor((endBox - 1) / cols);
        const endCol = (endBox - 1) % cols;

        const minRow = Math.min(startRow, endRow);
        const minCol = Math.min(startCol, endCol);

        const maxRow = Math.max(startRow, endRow);
        const maxCol = Math.max(startCol, endCol);

        const selected = [];
        for (let row = minRow; row <= maxRow; row++) {
          for (let col = minCol; col <= maxCol; col++) {
            selected.push(row * cols + col + 1);
          }
        }

        setSelectBoxes(selected);
      }
    },
    [isMouseDown]
  );

  const handleMouseUp = () => {
    setMouseDown(false);
    setSelectBoxes([]);
  };
  return (
    <div className="container">
      <h2 className="title">Selectable Grid</h2>
      <div
        className="grid"
        style={{ "--row": rows, "--col": cols }}
        onMouseUp={handleMouseUp}
      >
        {[...Array(rows * cols).keys()].map((_, index) => {
          return (
            <div
              key={index}
              className={`grid-item  ${
                selectBoxes.includes(index + 1) ? "selected" : ""
              }`}
              onMouseDown={() => handleMouseDown(index + 1)}
              onMouseEnter={() => handleMouseEnter(index + 1)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};
