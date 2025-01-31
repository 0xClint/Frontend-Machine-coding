import { useCallback, useState } from "react";
import "./SelectableGrid.css";

interface SelectableGridProps {
  rows?: number;
  columns?: number;
}

export default function SelectableGrid({
  rows = 8,
  columns = 10,
}: SelectableGridProps) {
  const [selectBoxes, setSelectBoxes] = useState<number[]>([]);
  const [isMouseDown, setMouseDown] = useState<boolean>(false);

  const handleMouseDown = (id: number) => {
    setMouseDown(true);
    setSelectBoxes([id]);
  };

  const handleMouseEnter = useCallback(
    (id: number) => {
      if (!isMouseDown) return;

      const startIndex = selectBoxes[0];
      const endIndex = id;

      const startRow = Math.floor(startIndex / columns);
      const startColumn = startIndex % columns;

      const endRow = Math.floor(endIndex / columns);
      const endColumn = endIndex % columns;

      const minRow = Math.min(startRow, endRow);
      const minColumn = Math.min(startColumn, endColumn);

      const maxRow = Math.max(startRow, endRow);
      const maxColumn = Math.max(startColumn, endColumn);

      const newSelectBox = [];
      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minColumn; col <= maxColumn; col++) {
          newSelectBox.push(row * columns + col);
        }
      }

      setSelectBoxes(newSelectBox);
    },
    [isMouseDown]
  );

  const handleMouseUp = () => {
    setMouseDown(false);
    setSelectBoxes([]);
  };
  return (
    <div className="selectable-grid">
      <h2>SelectableGrid</h2>
      <div
        className="grid-container"
        style={{
          gridTemplateRows: `repeat(${rows},1fr)`,
          gridTemplateColumns: `repeat(${columns},1fr)`,
        }}
        onMouseUp={handleMouseUp}
      >
        {[...Array(rows * columns).keys()].map((item) => (
          <div
            key={item}
            className={`selectable-grid-item flex-center ${
              selectBoxes.includes(item) && "active"
            }`}
            onMouseDown={() => handleMouseDown(item)}
            onMouseEnter={() => handleMouseEnter(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
