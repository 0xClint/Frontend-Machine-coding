import { useEffect, useRef, useState } from "react";
import "./DropDown.css";

interface DropDownProps {
  listData: any[];
  onSelect: (item: string) => void;
  windowHeight?: number;
  itemHeight?: number;
}

export default function DropDown({
  listData,
  onSelect,
  windowHeight = 300,
  itemHeight = 33,
}: DropDownProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(
    Math.floor(windowHeight / itemHeight)
  );
  const popupRef = useRef<any>(null);

  //*******************Dropdown logic************** */
  const handleDropdown = () => {
    setOpen(!isOpen);
  };

  const handleSelect = (event: any) => {
    const data = event.target.getAttribute("item-data");
    setValue(data);
    setOpen(false);
    onSelect(data);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" || event.key === " ") handleSelect(event);
  };

  //*******************Virtualization************** */

  const handleScroll = (event: any) => {
    const { scrollTop } = event.target;

    const scrollStartIndex = Math.floor(scrollTop / itemHeight);

    setStartIndex(scrollStartIndex);
    setEndIndex(
      Math.min(
        scrollStartIndex + Math.floor(windowHeight / itemHeight),
        listData.length
      )
    );
  };

  //**************************DropdownPopup*************** */

  useEffect(() => {
    const dropDownPopup = (event: any) => {
      if (popupRef.current && !popupRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", dropDownPopup);
    return () => document.removeEventListener("click", dropDownPopup);
  }, []);

  return (
    <div className="dropdown">
      <button
        className="dropdown-header"
        onClick={handleDropdown}
        ref={popupRef}
      >
        {value || "Header"}
      </button>

      <ul
        className={`dropdown-list ${isOpen && "active"}`}
        onClick={handleSelect}
        onKeyDown={(e) => handleKeyDown(e)}
        onScroll={handleScroll}
        style={{
          height: `${windowHeight}px`,
          border: "solid black 2px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div style={{ height: `${itemHeight * listData.length}px` }}>
          {listData
            .slice(startIndex, endIndex + 1)
            .map(({ id, content }, index) => {
              return (
                <li
                  key={id}
                  tabIndex={0}
                  item-data={content}
                  className={`dropdown-list-item ${
                    value === content ? "selected" : ""
                  }`}
                  style={{
                    top: `${(startIndex + index) * itemHeight}px`,
                  }}
                >
                  {content}
                </li>
              );
            })}
        </div>
      </ul>
    </div>
  );
}
