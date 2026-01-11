import { useEffect, useMemo, useRef, useState } from "react";
import "./DropDown.css";
import type { DropDownItems } from "./DropDown.type";

interface DropDownProps {
  placeholder?: string;
  list: DropDownItems[];
  onSelect?: (item: DropDownItems) => void;
  windowHeight?: number;
  itemHeight?: number;
}

export default function DropDown({
  placeholder = "Select Option",
  list,
  windowHeight = 100,
  itemHeight = 30,
  onSelect = () => {},
}: DropDownProps) {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<DropDownItems | null>(null);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [endIndex, setEndIndex] = useState<number>(
    Math.floor(windowHeight / itemHeight)
  );
  const popupRef = useRef<any>(null);

  const handleSelect = (event: React.MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLElement;

    if (target.tagName !== "LI") return;

    const selectedId = target.getAttribute("data-id");
    const selectedValue = target.getAttribute("data-value");
    const selectedLabel = target.getAttribute("data-label");

    if (!selectedId || !selectedValue || !selectedLabel) return;

    const selectedData = {
      id: selectedId,
      value: selectedValue,
      label: selectedLabel,
    };
    setSelected(selectedData);
    setOpen(false);
    onSelect(selectedData);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key === "Enter") handleSelect(event as any);
  };

  const handleScroll = (event: any) => {
    const { scrollTop } = event.target;

    const newStartIndex = Math.floor(scrollTop / itemHeight);
    // const newEndIndex = newStartIndex + Math.floor(windowHeight / itemHeight);
    setStartIndex(newStartIndex);
    setEndIndex(startIndex + Math.floor(windowHeight / itemHeight));
  };

  const renderList = useMemo(
    () => list.slice(startIndex, endIndex),
    [startIndex, endIndex, handleScroll]
  );

  useEffect(() => {
    const dropDownPopup = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current?.contains(event.target))
        setOpen(false);
    };

    document.addEventListener("click", dropDownPopup);
    return () => document.removeEventListener("click", dropDownPopup);
  }, []);
  return (
    <div>
      <h1>DropDown</h1>
      <div
        className="dropdown-container"
        style={{ position: "relative", width: 250 }}
      >
        <button
          className="dropdown-header"
          ref={popupRef}
          onClick={() => setOpen(!isOpen)}
        >
          {list.length > 0
            ? selected
              ? selected?.label
              : placeholder
            : "NO List item"}
        </button>
        {/* UX Issue using logical rendering */}
        {/* {isOpen && ( */}
        {list.length > 0 && (
          <ul
            className={`dropdown-list ${isOpen && "extended"}`}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
            onScroll={handleScroll}
            style={{
              height: Math.min(
                windowHeight - Math.floor(windowHeight * 0.2),
                itemHeight * list.length
              ),
              overflowY: "auto",
            }}
          >
            <div style={{ height: itemHeight * list.length }}>
              {renderList.map(({ id, value, label }, index) => (
                <li
                  className={`list-items ${
                    value == selected?.value && "selected"
                  }`}
                  tabIndex={0}
                  key={id}
                  data-value={value}
                  data-label={label}
                  data-id={id}
                  style={{
                    top: Math.floor((startIndex + index) * itemHeight),
                  }}
                >
                  {label}
                </li>
              ))}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
