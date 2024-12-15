import React, { useEffect, useRef, useState } from "react";
import "./DropDown2.css";

const DropDown2 = ({
  placeholder = "Select...",
  list = [],
  onChange = () => {},
}) => {
  const [value, setValue] = useState("");
  const [isOpen, setOpen] = useState(false);

  const popupRef = useRef(null);

  useEffect(() => {
    const handelPopup = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handelPopup);
    return () => document.removeEventListener("click", handelPopup);
  }, []);

  return (
    <div className="dropdown">
      <div
        className={`header`}
        style={{ outline: isOpen ? "2px solid blue" : "none" }}
        onClick={() => setOpen(!isOpen)}
        ref={popupRef}
      >
        {value ? value : placeholder}{" "}
        <span
          className="arrow"
          style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
        >
          🔽
        </span>
      </div>
      <ul className={`dropdown-list ${isOpen && "open"}`}>
        {list.map((item, index) => {
          return (
            <li
              key={index}
              className="dropdown-item"
              onClick={() => {
                setValue(item);
                onChange(item);
              }}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDown2;
