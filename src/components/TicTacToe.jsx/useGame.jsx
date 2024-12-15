import { useState } from "react";

const initialBoard = () => Array(9).fill(null);

export const useGame = () => {
  const [board, setBoard] = useState(initialBoard());
  const [isXNext, setIsXNext] = useState(true);

  const PATTERNS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (board) => {
    for (let i = 0; i < PATTERNS.length; i++) {
      const [a, b, c] = PATTERNS[i];
      if (board[a] && board[a] == board[b] && board[b] == board[c])
        return board[a];
    }

    return null;
  };

  const handleClick = (index) => {
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const getMessage = () => {
    const winner = calculateWinner(board);
    if (winner) return `Player ${winner} wins!`;
    if (!board.includes(null)) return "It's a Draw!";

    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  const resetGame = () => {
    setBoard(initialBoard());
  };

  return { board, handleClick, getMessage, resetGame };
};
