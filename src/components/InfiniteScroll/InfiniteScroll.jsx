import React, { useCallback, useEffect, useRef, useState } from "react";
import "./infiniteScroll.css";

export const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageIdx, setPageIdx] = useState(1); // start from first page

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
    if (loader) return; 
    setLoader(true);

    const res = await fetchData(pageIdx);
    if (res.length === 0) {
      // No more data, stop loading and remove observer if needed.
      setLoader(false);
      return;
    }

    setData((prev) => [...prev, ...res]);
    setPageIdx((prev) => prev + 1);
    setLoader(false);
  }, [loader, pageIdx]);

  useEffect(() => {
    // Initial data load
    // This ensures the first batch is loaded without waiting for scrolling.
    // After this, the intersection observer will handle subsequent loads.
    (async () => {
      setLoader(true);
      const initialData = await fetchData(pageIdx);
      setData(initialData);
      setPageIdx((prev) => prev + 1);
      setLoader(false);
    })();
  }, []); // run once on mount

  useEffect(() => {
    // Only attach the observer once
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loader) {
          // When the loader div is visible and we're not currently loading, fetch next page
          loadData();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loader, loadData]);

  return (
    <div className="container">
      {data.map(({ thumbnailUrl, id }) => (
        <div key={id} className="img-content">
          <span className="center-id">{id}</span>
          <img alt={`thumbnail-${id}`} src={thumbnailUrl} />
        </div>
      ))}
      <div ref={loaderRef} style={{ textAlign: "center", padding: "10px" }}>
        {loader && <span>LOADING...</span>}
      </div>
    </div>
  );
};
