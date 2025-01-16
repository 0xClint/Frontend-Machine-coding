import React, { useEffect, useState } from "react";

const ItemPost = ({ data }) => {
  const [loader, setLoader] = useState(true);
  const { thumbnail, title } = data;
  return (
    <div
      className="post-card"
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* {} */}
      <div style={{ width: "250px", height: "250px" }}>
        {" "}
        {loader && <span className="loader">Loading...</span>}
        <img
          src={thumbnail}
          width={250}
          style={{
            border: "1px solid gray",
            display: loader ? "none" : "block",
          }}
          onLoad={() => setLoader(false)}
        />
      </div>
      <span style={{ textAlign: "center" }}>{title}</span>
    </div>
  );
};

const PostItems = ({ listData, setPageIdx }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((params) => {
      if (params[0].isIntersecting) {
        console.log("calling extra data!");
        observer.unobserve(lastItem);
        setPageIdx((pageIdx) => pageIdx + 1);
      }
    });
    const lastItem = document.querySelector(".post-card:last-child");
    if (lastItem) observer.observe(lastItem);

    return () => {
      if (lastItem) {
        observer.unobserve(lastItem);
      }
      observer.disconnect();
    };
  }, [listData, setPageIdx]);

  return (
    <div
      className="color-container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      {listData.map((data) => {
        return <ItemPost data={data} key={data.id} />;
      })}
    </div>
  );
};

const LIMIT = 10;
export const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [pageIdx, setpageIdx] = useState(0);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${LIMIT * pageIdx}`
      );
      const result = await res.json();
      setData((prevState) => [...prevState, ...result.products]);
    } catch (error) {
      setData([]);
      return new Error("something went wrong!");
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageIdx]);

  return (
    <div>
      <h2>infinte Scroll</h2>

      <PostItems listData={data} setPageIdx={setpageIdx} />
    </div>
  );
};
