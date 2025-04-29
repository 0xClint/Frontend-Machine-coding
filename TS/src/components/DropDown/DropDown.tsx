import { useEffect, useRef, useState } from "react";
import "./DropDown.css";

interface IDropDownProps {
  list: any[];
  onSelect: (item: string) => void;
  placeholder?: string;
  windowHeight?: number;
  itemHeight?: number;
}



export default function DropDown({
  list,
  onSelect,
  placeholder = "Select Item",
  windowHeight = 300,
  itemHeight = 30,
}: IDropDownProps) {
  const [value, setValue] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(
    Math.floor(windowHeight / itemHeight)
  );

  const popupRef = useRef<any | null>(null);

  const handleClick = () => {
    setExpand(!expand);
  };

  const handleSelect = (event: any) => {
    const selectedItem = event.target.getAttribute("content-value");
    if (selectedItem) {
      setValue(selectedItem);
      setExpand(false);
      onSelect(selectedItem);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" || event.key === " ") handleSelect(event);
  };

  const handleScroll = (event: any) => {
    const { scrollTop } = event.target;
    const newStartIndex = Math.floor(scrollTop / itemHeight);
    setStartIndex(newStartIndex);

    setEndIndex(newStartIndex + Math.floor(windowHeight / itemHeight));
  };

  useEffect(() => {
    const handlePopup = (event: any) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setExpand(false);
      }
    };
    document.addEventListener("click", handlePopup);

    return () => document.removeEventListener("click", handlePopup);
  }, []);

  return (
    <div className="dropdown">
      <h2>DropDown</h2>
      <div className="dropdown-container">
        <button onClick={handleClick} className="header" ref={popupRef}>
          {value || placeholder}
        </button>
        <ul
          className={`list-content  ${expand && "active"}`}
          onClick={handleSelect}
          style={{ height: `${windowHeight - 10}px`, overflowY: "auto" }}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
        >
          <div style={{ height: `${list.length * itemHeight}px` }}>
            {list.slice(startIndex, endIndex).map(({ id, content }, index) => (
              <li
                key={id}
                tabIndex={0}
                role="listitem"
                style={{
                  height: `${itemHeight}px`,
                  top: `${(startIndex + index) * itemHeight}px`,
                }}
                content-value={content}
                className={`list-item ${content === value && "selected"}`}
              >
                {content}
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
}
