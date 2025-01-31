import { useState } from "react";
import "./StarRating.css";

interface starRatingProps {
  number?: number;
}

export default function StarRating({ number = 5 }: starRatingProps) {
  const [hover, setHover] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const handleMouseOver = (id: number) => {
    setHover(id);
  };

  const handleSelect = (id: number) => {
    if (rating === id) {
      setRating(0);
      return;
    }
    setRating(id);
  };

  const handleKeySelect = (event: any, id: number) => {
    if (event.key === "Enter" || event.key === " ") handleSelect(id);
  };
  return (
    <div>
      <h2>Star Rating</h2>
      <div className="star-rating-container">
        {[...Array(number)].map((_, index) => {
          return (
            <span
              tabIndex={0}
              className="star-item"
              onKeyDown={(e) => handleKeySelect(e, index)}
              key={index}
              onClick={() => handleSelect(index)}
              style={{
                color: hover >= index || rating >= index ? "#d3bd41" : "black",
              }}
              onMouseOver={() => handleMouseOver(index)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ★
