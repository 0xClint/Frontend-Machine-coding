import React, { useState } from "react";
import "./ProductCard.css";

export const ProductCard = ({ data }) => {
  const [loader, setLoader] = useState(true);

  return (
    <div className="img-container">
      <div className="product-item">
        <div className="img-container">
          {loader && <span className="loader">Loading...</span>}
          <img
            src={data.thumbnail}
            onLoad={() => setLoader(false)}
            style={{ display: loader ? "none" : "block" }}
            alt={data.title}
          />
        </div>
        <span className="product-title">{data.title}</span>
      </div>
    </div>
  );
};
