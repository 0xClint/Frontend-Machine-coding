import React, { useState } from "react";

const tempList = [...Array(50000).keys()].map((item) => ({
  id: item + 1,
  content: `Item  ${item + 1}`,
}));

export const Virtualization = ({
  list = tempList,
  windowHeight = 350,
  windowWidth = 400,
  itemHeight = 35,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(
    Math.floor(windowHeight / itemHeight)
  );

  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const scrollStartIndex = Math.floor(scrollTop / itemHeight);
    // console.log(scrollStartIndex);
    setStartIndex(scrollStartIndex);
    setEndIndex(
      Math.min(
        scrollStartIndex + Math.floor(windowHeight / itemHeight),
        list.length
      )
    );
  };

  const handleClick = (e) => {
    //EVENT DELEGATION
    console.log("Clicked on Item no. " + e.target.getAttribute("content"));
  };

  return (
    <div
      className=""
      style={{
        marginTop: "3rem",
        height: windowHeight,
        width: windowWidth,
        position: "relative",
        overflow: "auto",
      }}
      onScroll={handleScroll}
    >
      {/* <div style={{ height: "700px" }}>dd</div> */}
      <div
        className="listItemContent"
        style={{
          height: `${itemHeight * list.length}px`,
          width: "100%",
          background: "gray",
        }}
        onClick={handleClick}
      >
        {list.slice(startIndex, endIndex + 1).map(({ id, content }, index) => {
          return (
            <div
              key={id}
              content={id}
              style={{
                width: "100%",
                height: itemHeight,
                borderBottom: "1px solid black",
                textAlign: "center",
                position: "absolute",
                top: `${(startIndex + index) * itemHeight}px`,
              }}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};
