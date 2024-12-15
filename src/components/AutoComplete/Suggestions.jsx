import React from "react";
import "./Suggestions";

export const Suggestions = ({ data = [], onSelect, highlight }) => {
  console.log(data);

  const gethighlightedWords = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((item) =>
          item.toLowerCase() === highlight.toLowerCase() ? <b>{item}</b> : item
        )}
      </span>
    );
  };
  return (
    <>
      {data.map(({ id, name }) => {
        return (
          <li key={id} onClick={() => onSelect(name)}>
            {gethighlightedWords(name, highlight)}
          </li>
        );
      })}
    </>
  );
};
