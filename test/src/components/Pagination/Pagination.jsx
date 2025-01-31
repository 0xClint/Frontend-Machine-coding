import React, { useEffect, useState } from "react";
import "./Pagination.css";
import { ProductCard } from "./ProductCard";

const PRODUCT_LIMIT = 20;
export const Pagination = () => {
  const [currPage, setCurrPage] = useState(1);
  const [productsData, setProductsData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(2);
  const [loader, setLoader] = useState(false);

  const fetchData = async () => {
    setLoader(true);
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${PRODUCT_LIMIT}&skip=${
          currPage * PRODUCT_LIMIT - PRODUCT_LIMIT
        }`
      );
      if (!res.ok) throw new Error("Something went wrong!");
      const data = await res.json();
      if (data && data.products) {
        setProductsData(data.products);
        setTotalProducts(Math.ceil(data.total / PRODUCT_LIMIT));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currPage]);

  const handleChangePage = (pageNumber) => {
    if (
      pageNumber > totalProducts ||
      pageNumber < 1 ||
      pageNumber == currPage
    )
      return;
    setCurrPage(pageNumber);
  };

  return (
    <div className="product-page">
      <h2 className="product-heading">Products</h2>
      {loader ? (
        <div>LOADING...</div>
      ) : (
        <div className="product-container">
          {productsData?.map((data) => {
            return <ProductCard key={data.id} data={data} />;
          })}
        </div>
      )}
      <div className="pagination-container">
        <span className="left" onClick={() => handleChangePage(currPage - 1)}>
          ◀️
        </span>

        <span className="center">
          {productsData &&
            [...Array(totalProducts)].map((_, i) => {
              return (
                <div
                  key={i}
                  className={`page-item ${
                    currPage == i + 1 ? "page-selected" : ""
                  }`}
                  onClick={() => handleChangePage(i + 1)}
                >
                  {i + 1}
                </div>
              );
            })}
        </span>
        <span className="right" onClick={() => handleChangePage(currPage + 1)}>
          ▶️
        </span>
      </div>
    </div>
  );
};
