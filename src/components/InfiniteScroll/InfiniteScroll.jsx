import React, { useCallback, useEffect, useRef, useState } from "react";
import "./infiniteScroll.css";

export const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageIdx, setPageIdx] = useState(1);

  const loaderRef = useRef(null);

  const fetchData = async (pageNo) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${pageNo}`
      );
      return await res.json();
    } catch (error) {
      console.log("Fetch error: ", error);
      return [];
    }
  };

  const loadData = useCallback(async () => {
    // if (loader) return;
    setLoader(true);

    const res = await fetchData(pageIdx);
    if (res.length === 0) {
      setLoader(false);
      return;
    }

    setData((prev) => [...prev, ...res]);
    // console.log(res);
    setLoader(false);
  }, [pageIdx]);

  useEffect(() => {
    loadData();
  }, [pageIdx]);

  useEffect(() => {
    const observer = new IntersectionObserver((params) => {
      if (params[0].isIntersecting) {
        observer.unobserve(lastPost);
        setPageIdx((prev) => prev + 1);
      }
    });
    const lastPost = document.querySelector(".img-content:last-child");
    if (!lastPost) return;
    observer.observe(lastPost);

    return () => {
      if (lastPost) observer.unobserve(lastPost);
      observer.disconnect();
    };
  }, [loader]);

  console.log(pageIdx);

  return (
    <div className="container">
      {data.map(({ thumbnailUrl, id }, index) => (
        <div key={`${index}-${id}`} className="img-content">
          <span className="center-id">{id}</span>
          <img alt={`thumbnail-${id}`} src={thumbnailUrl} />
        </div>
      ))}
      {/* <div ref={loaderRef} style={{ textAlign: "center", padding: "10px" }}>
        {loader && <span>LOADING...</span>}
      </div> */}
    </div>
  );
};
