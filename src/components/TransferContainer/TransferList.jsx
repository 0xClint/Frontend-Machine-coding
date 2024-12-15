import React, { useState } from "react";
import "./TransferList.css";

const listData = [
  { id: 1, content: "First", check: false },
  { id: 2, content: "Second", check: false },
  { id: 3, content: "Third", check: false },
  { id: 4, content: "Fourth", check: false },
];
export const TransferList = () => {
  const [leftList, setLeftList] = useState(listData);
  const [rightList, setRightList] = useState([]);

  const toggleCheck = (list, id) => {
    return list.map((item) => {
      if (item.id === id)
        return {
          ...item,
          check: !item.check,
        };
      else return item;
    });
  };

  const handleCheck = (id, status) => {
    if (status === "LEFT") {
      setLeftList(toggleCheck(leftList, id));
    } else {
      setRightList(toggleCheck(rightList, id));
    }
  };

  const handleTransfer = (status) => {
    if (status === "RIGHT") {
      if (leftList.length === 0) return;
      const copyList = [...leftList];
      const checkedList = copyList
        .filter(({ check }) => check)
        .map((item) => {
          return { ...item, check: false };
        });
      const unCheckedList = copyList.filter(({ check }) => !check);

      setRightList((prevList) => [...prevList, ...checkedList]);
      setLeftList(unCheckedList);
    } else {
      if (rightList.length === 0) return;
      const copyList = [...rightList];
      const checkedList = copyList
        .filter(({ check }) => check)
        .map((item) => {
          return { ...item, check: false };
        });
      const unCheckedList = copyList.filter(({ check }) => !check);

      setLeftList((prevList) => [...prevList, ...checkedList]);
      setRightList(unCheckedList);
    }
  };

  return (
    <div className="transfer-list-container">
      <div className="left list-container">
        {leftList.map(({ id, content, check }) => {
          return (
            <div
              key={id}
              className={`list-item ${check ? "check" : ""}`}
              onClick={() => handleCheck(id, "LEFT")}
            >
              {content}
            </div>
          );
        })}
      </div>
      <div className="center">
        <button onClick={() => handleTransfer("RIGHT")}>Right</button>
        <button onClick={() => handleTransfer("LEFT")}>Left</button>
      </div>
      <div className="right list-container">
        {rightList.map(({ id, content, check }) => {
          return (
            <div
              key={id}
              className={`list-item ${check ? "check" : ""}`}
              onClick={() => handleCheck(id, "RIGHT")}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
