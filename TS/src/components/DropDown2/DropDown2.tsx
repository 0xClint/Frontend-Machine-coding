import { useEffect, useRef, useState } from "react";
import "./DropDown2.css";

interface IDropDown {
  list: any[];
  onSelect: (item: string) => void;
  placeholder: string;
  windowHeight?: number;
  itemHeight?: number;
}
export default function DropDown2({
  list,
  onSelect = () => {},
  placeholder = "Select Options",
  windowHeight = 300,
  itemHeight = 30,
}: IDropDown) {
  const [isExtend, setExtend] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(
    Math.floor(windowHeight / itemHeight)
  );

  const popupRef = useRef<any>(null);

  const handleSelect = (event: any) => {
    console.log(event);
    const value = event.target.getAttribute("data-value");
    console.log(value);
    setValue(value);
    setExtend(!isExtend);
    onSelect(value);
  };

  const handleScroll = (event: any) => {
    const { scrollTop } = event.target;

    const newStartIndex = Math.floor(scrollTop / itemHeight);

    setStartIndex(newStartIndex);
    setEndIndex(newStartIndex + Math.floor(windowHeight / itemHeight));
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" || event.key === " ") handleSelect(event);
  };

  useEffect(() => {
    const dropDownPopup = (event: any) => {
      if (popupRef.current && !popupRef.current?.contains(event.target))
        setExtend(false);
    };

    document.addEventListener("click", dropDownPopup);
    return () => document.removeEventListener("click", dropDownPopup);
  }, []);

  return (
    <div className="dropdown">
      <h2>DropDown2</h2>
      <div className="dropdown-container">
        <button
          className="dropdown-header"
          ref={popupRef}
          onClick={() => setExtend(!isExtend)}
        >
          {value || placeholder}
        </button>
        <ul
          className={`list-container ${isExtend && "active"}`}
          style={{
            height: windowHeight - 50,
            overflowY: "scroll",
          }}
          onScroll={handleScroll}
          onClick={handleSelect}
          onKeyDown={handleKeyDown}
        >
          <div style={{ height: list.length * itemHeight }}>
            {list.slice(startIndex, endIndex).map(({ id, content }, index) => (
              <li
                key={id}
                tabIndex={0}
                data-value={content}
                className={`list-item  ${value === content && "selected"}`}
                style={{
                  transform: `translateY(${
                    (startIndex + index) * itemHeight
                  }px)`,
                }}
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
