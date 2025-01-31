import React from "react";
import { useGame } from "./useGame";
import "./Game.css";

export const Game = () => {
  const { board, handleClick, getMessage, resetGame } = useGame();

  return (
    <div className="container">
      <h2>Tic-Tac-Toe</h2>
      <div className="status">{getMessage()}</div>
      <div className="board">
        {board.map((item, idx) => {
          return (
            <div key={idx} className="item" onClick={() => handleClick(idx)}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
