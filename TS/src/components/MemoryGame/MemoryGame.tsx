import { ChangeEvent, useEffect, useState } from "react";
import "./MemoryGame.css";

interface cardProps {
  id: number;
  number: number;
}

export default function MemoryGame() {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState<cardProps[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [first, setFirst] = useState<number>(-1);
  const [second, setSecond] = useState<number>(-1);
  const [win, setWin] = useState<boolean>(false);

  const handleGridSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isNumber = (str: string) => {
      if (str.length === 0) return false;

      return str.length === 8 && /^[0-9]+$/.test(str);
    };

    if (e.target.value.length !== 0 && !isNumber(e.target.value)) {
      const value = parseInt(e.target.value);
      setGridSize(value);
    }
  };

  const initializeGame = () => {
    const gridnumber = gridSize & 1 ? gridSize - 1 : gridSize;
    const gridData = [...Array((gridnumber * gridnumber) / 2).keys()].map(
      (item) => item + 1
    );

    const shuffledGrid = [...gridData, ...gridData]
      .sort(() => Math.random() - 0.5)
      .map((number, index) => ({ id: index, number }));

    setCards(shuffledGrid);
    setFirst(-1);
    setSecond(-1);
    setSolved([]);
    setWin(false);
  };

  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  useEffect(() => {
    if (solved.length !== 0 && solved.length === cards.length) setWin(true);
  }, [cards, solved]);

  const checkMatch = (secondNum: number) => {
    console.log(cards[first], cards[secondNum]);
    if (cards[first].number === cards[secondNum].number) {
      setSolved((prevState) => [...prevState, first, secondNum]);
      return;
    }

    setTimeout(() => { 
      setFirst(-1);
      setSecond(-1);
    }, 1000);
  };

  const handleClick = (e: any) => {
    // console.log(e)
    const value = parseInt(e.target.getAttribute("cell-number"));

    if (first === -1) setFirst(value);
    else if (second === -1) {
      setSecond(value);
      checkMatch(value);
    } else {
      setFirst(-1);
      setSecond(-1);
    }
  };

  const isFlipped = (id: number) =>
    id === first || id === second || solved.includes(id);

  const isSolved = (numId: number) => solved.includes(numId);

  return (
    <div>
      <h2>MemoryGame</h2>
      <div>
        <input
          type="number"
          placeholder="cell size"
          value={gridSize}
          onChange={handleGridSizeChange}
          min={2}
          max={8}
        />
      </div>

      <div
        className="memory-board-container"
        onClick={handleClick}
        style={{
          gridTemplateRows: `repeat(${
            gridSize & 1 ? gridSize - 1 : gridSize
          },1fr)`,
          gridTemplateColumns: `repeat(${
            gridSize & 1 ? gridSize - 1 : gridSize
          },1fr)`,
        }}
      >
        {cards.map(({ id, number }) => {
          return (
            <div
              key={id}
              className="memory-board-cell"
              cell-number={id}
              style={{ backgroundColor: isSolved(id) ? "green" : "#3670fe" }}
            >
              {isFlipped(id) ? number : "?"}
            </div>
          );
        })}
      </div>
      {win && <div>You Won!</div>}
    </div>
  );
}
