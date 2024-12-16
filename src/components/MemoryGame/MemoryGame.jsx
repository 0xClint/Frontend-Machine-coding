import React, { useEffect, useState } from "react";
import "./MemoryGame.css";

export const MemoryGame = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);
  const [solved, setSolved] = useState([]);
  const [first, setFirst] = useState(-1);
  const [second, setSecond] = useState(-1);
  const [won, setWon] = useState(false);

  const handleGridSize = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 2 && value <= 10) setGridSize(value);
  };

  const initializeGrid = () => {
    const evenSize = gridSize & 1 ? gridSize - 1 : gridSize;
    const totalNumer = (evenSize * evenSize) / 2;
    const numbers = [...Array(totalNumer).keys()].map((num) => num + 1);
    // console.log(numbers);

    const shuffledCard = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .map((num, index) => ({
        id: index,
        number: num,
      }));
    setCards(shuffledCard);
    setFirst(-1);
    setSecond(-1);
    setSolved([]);
  };

  useEffect(() => {
    initializeGrid();
  }, [gridSize]);

  useEffect(() => {
    if (solved.length !== 0 && solved.length === cards.length) setWon(true);
  }, [cards, solved]);

  const checkMatch = (secondId) => {
    if (cards[first].number == cards[secondId].number) {
      setSolved([...solved, first, secondId]);
      setFirst(-1);
      setSecond(-1);
    } else {
      setTimeout(() => {
        setFirst(-1);
        setSecond(-1);
      }, 500);
    }
  };

  const handleClick = (id) => {
    if (first == -1) {
      setFirst(id);
      return;
    }

    if (second == -1 && id != first) {
      setSecond(id);

      //check Match
      checkMatch(id);
    } else {
      setFirst(-1);
    }
  };

  const isFlipped = (id) => id == first || id == second || solved.includes(id);

  const isSolved = (id) => solved.includes(id);
  // console.log("first -> " + first);
  // console.log("second -> " + second);
  return (  
    <div>
      <h2>Memory Game</h2>
      <div className="header-content">
        <label>Grid Size</label>
        <input type="number" value={gridSize} onChange={handleGridSize} />
        <div
          className="memory-board"
          style={{
            gridTemplateColumns: `repeat(${
              gridSize & 1 ? gridSize - 1 : gridSize
            },1fr)`,
            gridTemplateRows: `repeat(${
              gridSize & 1 ? gridSize - 1 : gridSize
            },1fr)`,
          }}
        >
          {cards.map(({ id, number }) => {
            return (
              <div
                key={id}
                className="cell"
                onClick={() => handleClick(id)}
                style={{
                  backgroundColor: isSolved(id)
                    ? "green"
                    : "rgb(207, 233, 255)",
                }}
              >
                {isFlipped(id) ? number : "?"}
              </div>
            );
          })}
        </div>

        {won && <span>You Won!!!</span>}
      </div>
    </div>
  );
};
