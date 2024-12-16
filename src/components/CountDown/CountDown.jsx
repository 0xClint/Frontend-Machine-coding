import React, { useEffect, useRef, useState } from "react";
import "./CountDown.css";

export const CountDown = () => {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
  });

  const timerRef = useRef(null);

  const [isRunning, setRunning] = useState(false);
  //   const ]

  const handleInputChange = (e, type) => {
    const value = e.target.value;

    if (isNaN(value)) return;
    let tempValue;
    if (type === "hour") {
      if (value > 24) tempValue = 24;
      else if (value < 0) tempValue = 0;
      else tempValue = value;
    }

    if (type === "minute") {
      if (value > 59) tempValue = 59;
      else if (value < 0) tempValue = 0;
      else tempValue = value;
    }
    if (type === "second") {
      if (value > 59) tempValue = 59;
      else if (value < 0) tempValue = 0;
      else tempValue = value;
    }

    let copyTime = { ...time };

    copyTime[type] = tempValue;
    setTime(() => copyTime);
  };

  const handleStart = () => {
    setRunning(true);
  };

  const handlePause = () => {
    setRunning(false);
  };

  const handleReset = () => {
    setRunning(false);
    setTime({ hour: "", minute: "", second: "" });
  };

  useEffect(() => {
    if (isRunning) {
      if (
        time.hour.length === 0 &&
        time.minute.length === 0 &&
        time.second.length === 0
      )
        return;

      timerRef.current = setTimeout(() => {
        setTime((prevTime) => {
          let { hour, minute, second } = prevTime;

          second--;
          if (second < 0) {
            minute--;
            second = 59;

            if (minute < 0) {
              hour--;
              minute = 59;

              if (hour < 0) {
                clearTimeout(timerRef.current);
                setRunning(false);
                return { hour: "", minute: "", second: "" };
              }
            }
          }
          return { hour, minute, second };
        });
      }, 1000);
    }

    return () => clearTimeout(timerRef.current);
  });
  return (
    <div className="countdown">
      <h1>CountDown</h1>
      <div className="input-container">
        <input
          className="countdown-input"
          type="text"
          placeholder="00"
          disabled={isRunning}
          value={time.hour}
          onChange={(e) => handleInputChange(e, "hour")}
        />
        :
        <input
          className="countdown-input"
          type="text"
          placeholder="00"
          disabled={isRunning}
          value={time.minute}
          onChange={(e) => handleInputChange(e, "minute")}
        />
        :
        <input
          className="countdown-input"
          type="text"
          placeholder="00"
          disabled={isRunning}
          value={time.second}
          onChange={(e) => handleInputChange(e, "second")}
        />
      </div>
      <div className="btn-container">
        {isRunning ? (
          <button className="btn" onClick={handlePause}>
            Pause
          </button>
        ) : (
          <button className="btn" onClick={handleStart}>
            Start
          </button>
        )}
        <button className="btn" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};
