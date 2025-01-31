import { useEffect, useState } from "react";
import "./GridLight.css";

interface IGridBoard {
  id: number;
  content: number;
  disable: boolean;
  active: boolean;
}

const gridData = () => {
  const board = [...Array(9).keys()].map((item) => ({
    id: item,
    content: item + 1,
    active: false,
    disable: false,
  }));

  board[4].disable = true;
  board[5].disable = true;
  return board;
};
const GRID_COLS = 3;
const GRID_ROWS = 3;

export default function GridLight() {
  const [gridBoard, setGridBoard] = useState<IGridBoard[]>(gridData);
  const [coloredList, setColoredList] = useState<number[]>([]);

  const handleClick = (event: any) => {
    const value = event.target.getAttribute("data-value");

    if (coloredList.includes(parseInt(value))) return;

    setColoredList((prevState) => [...prevState, value]);

    setGridBoard((prevState) =>
      prevState.map((item) => {
        const cell = item;
        if (cell.id === parseInt(value)) cell.active = true;
        return cell;
      })
    );
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" || e.key === " ") handleClick(e);
  };

  useEffect(() => {
    const clearGame = async () => {
      if (
        coloredList.length !== 0 &&
        coloredList.length === gridBoard.length - 2
      ) {
        const len = coloredList.length;

        for (let i = 0; i < len; i++) {
          await new Promise((resolve) => setTimeout(resolve, 300));

          const id = coloredList[i];

          setGridBoard((prevState) =>
            prevState.map((item) => {
              const cell = item;
              if (cell.id == id) cell.active = false;
              return cell;
            })
          );
        }

        setColoredList([]);
      }
    };

    clearGame();
  }, [coloredList]);

  return (
    <div className="gridlight">
      <h2>GridLight</h2>
      <div
        className="gridlight-container"
        style={{
          gridTemplateRows: `repeat(${GRID_ROWS},1fr)`,
          gridTemplateColumns: `repeat(${GRID_COLS},1fr)`,
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {gridBoard.map(({ id, content, disable, active }) => (
          <div
            tabIndex={0}
            key={id}
            className="gridlight-item flex-center"
            style={{
              visibility: disable ? "hidden" : "visible",
              backgroundColor: active ? "#00f0a0" : "aqua",
            }}
            data-value={id}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}
