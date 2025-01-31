import { useState } from "react";

const initializeBoard = (length: number) => Array(length).fill(null);

export default function useGame() {
  const [cellLength, setCellLength] = useState<number>(9);
  const [gameBoard, setGameBoard] = useState(initializeBoard(cellLength));
  const [isNext, setNext] = useState<boolean>(true);

  const patternCreator = (cellLen: number) => {
    const patterns: number[][] = [];

    for (let i = 0; i < cellLen; i++) {
      const patternH: number[] = [];

      for (let j = 0; j < cellLen; j++) {
        patternH.push(i * cellLen + j);
      }
      patterns.push(patternH);
    }

    for (let i = 0; i < cellLen; i++) {
      const patternV: number[] = [];
      for (let j = 0; j < cellLen; j++) {
        patternV.push(j * cellLen + i);
      }

      patterns.push(patternV);
    }

    const diagonalLeft: number[] = [];
    for (let i = 0; i < cellLen; i++) {
      diagonalLeft.push(i * cellLen + i);
    }
    patterns.push(diagonalLeft);

    const diagonalRight: number[] = [];
    for (let i = 0; i < cellLen; i++) {
      diagonalRight.push(i * cellLen + cellLen - i - 1);
    }
    patterns.push(diagonalRight);

    return patterns;
  };

  //   const PATTERNS = patternCreator(3);
  //   console.log(PATTERNS);
  const calculateWinner = (board: any[]) => {
    const PATTERNS = patternCreator(3);

    for (let i = 0; i < PATTERNS.length; i++) {
      const [a, b, c] = PATTERNS[i];

      if (board[a] && board[a] == board[b] && board[b] == board[c])
        return board[a];
    }
    return null;
  };

  const onSelect = (id: number) => {
    const winner = calculateWinner(gameBoard);
    if (winner) return;

    setGameBoard((prevState) => {
      const newBoard = prevState;

      newBoard[id] = isNext ? "X" : "O";
      return newBoard;
    });

    setNext(!isNext);

    // calculateWinner(gameBoard);
  };

  const getMessage = () => {
    const winner = calculateWinner(gameBoard);
    if (winner) return `Player ${winner} wins!`;

    if (!gameBoard.includes(null)) return "Its a Draw!";

    return `Player ${isNext ? "X" : "O"} turn`;
  };
  return { gameBoard, onSelect, getMessage };
}
