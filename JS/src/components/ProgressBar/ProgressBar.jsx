import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

export const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
  const [precent, setPercent] = useState(value);

  useEffect(() => {
    if (value <= 0) setPercent(0);
    else if (value > 100) setPercent(100);
    else setPercent(value);
  }, [value]);

  useEffect(() => {
    if (precent == 100) onComplete();
  }, [precent]);

  return (
    <div className="progressbar">
      <span
        className="number"
        style={{ color: precent >= 50 ? "white" : "black" }}
      >
        {precent.toFixed()}%
      </span>
      <span className="inc-bar" style={{ width: `${precent}%` }}></span>
    </div>
  );
};
