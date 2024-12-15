import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.css";


export const Dropdown = ({ placeholder = "Select...", list = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);

  const popupRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setValue(item);
  };

  useEffect(() => {
    const handleClick = (event) => {
      //   console.log(event.target);
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return (
    <div className="dropdown-container">
      <div
        className="dropdown-btn"
        onClick={() => handleOpen()}
        ref={popupRef}
        style={{ border: isOpen ? "2px solid blue" : "1px solid gray" }}
      >
        <span>{value ? value : placeholder}</span>
        <span className={`arrow-icon ${isOpen ? "open" : ""}`}>T</span>
      </div>

      <div className={`dropdown-content ${isOpen ? "open" : ""}`}>
        {list.length
          ? list.map((item, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(item)}
              >
                {item}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};
