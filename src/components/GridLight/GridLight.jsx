import React, { useEffect, useState } from "react";
import "./GridLight.css";

const configData = [
  { id: 1, isSelected: false, isDisabled: false },
  { id: 2, isSelected: false, isDisabled: false },
  { id: 3, isSelected: false, isDisabled: false },
  { id: 4, isSelected: false, isDisabled: false },
  { id: 5, isSelected: false, isDisabled: true },
  { id: 6, isSelected: false, isDisabled: false },
  { id: 7, isSelected: false, isDisabled: false },
  { id: 8, isSelected: false, isDisabled: false },
  { id: 9, isSelected: false, isDisabled: false },
];

export const GridLight = () => {
  const [gridBoard, setGridBoard] = useState(configData);
  const [coloredList, setColoredList] = useState([]);
  const [totalNums, setTotalNums] = useState(() => {
    return configData.reduce((accumulator, item) => {
      //   if (item.isDisabled) ans++;
      return accumulator - (item.isDisabled ? 1 : 0);
    }, configData.length);
  });
//   console.log(totalNums);
  const handleSelect = (boxId) => {
    setGridBoard((prevState) => {
      return prevState.map((item) => {
        const data = item;
        if (data.id === boxId) {
          data.isSelected = true;
        }
        return data;
      });
    });
    setColoredList([...coloredList, boxId]);
  };
  //   console.log(gridBoard);
  const reverseColor = async () => {
    const coloredData = coloredList;
    for (let i = 0; i < coloredData.length; i++) {
      const id = coloredData[i];

      setTimeout(() => {
        setGridBoard((prevState) => {
          return prevState.map((item) => {
            const data = item;
            if (data.id === id) {
              data.isSelected = false;
            }
            return data;
          });
        });
      }, 400 * i);

      //   await new Promise((res) => setTimeout(res, 1000));
    }
  };
  useEffect(() => {
    const checkComplete = () => {
      if (gridBoard.length != 0 && totalNums === coloredList.length) {
        console.log("all are colored!");
        reverseColor();
      }
    };
    checkComplete();
  }, [coloredList]);
  return (
    <div>
      <h2>GridLight</h2>
      <div className="gridboard">
        {gridBoard.map(({ id, isSelected, isDisabled }) => {
          return (
            <div
              key={id}
              className="grid-item"
              style={{
                visibility: isDisabled ? "hidden" : "",
                backgroundColor: isSelected ? "aquamarine" : "aliceblue",
              }}
              onClick={() => handleSelect(id)}
            >
              {id}
            </div>
          );
        })}
      </div>
    </div>
  );
};
