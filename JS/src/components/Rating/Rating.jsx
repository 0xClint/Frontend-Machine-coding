import React, { useState } from "react";
import "./Rating.css";

export const Rating = ({ number }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="rating">
      <h2>Rating</h2>
      <div className="rating-container">
        {[...Array(number)].map((item, i) => {
          return (
            <span
              className={`rating-item ${
                rating >= i || hover >= i ? "selected" : ""
              }`}
              onClick={() => setRating(i)}
              onMouseOver={() => setHover(i)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          );
        })}
      </div>
    </div>
  );
};
