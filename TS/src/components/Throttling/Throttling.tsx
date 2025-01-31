import React, { useEffect, useRef, useState } from "react";

const useThrottle = (value: any, delay: number = 1000) => {
  const [throttleValue, setThrottleValue] = useState(value);

  const flagRef = useRef(true);

  useEffect(() => {
    if (flagRef.current) {
      setThrottleValue(value);
      flagRef.current = false;

      setTimeout(() => (flagRef.current = true), delay);

      //   return () => clearTimeout(timeout);
    }
  }, [value, delay]);
  return throttleValue;
};

export default function Throttling() {
  const [top, setTop] = useState(0);

  const throttledValue = useThrottle(top);

  useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY);
    };

    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div style={{ height: "1000vh", position: "relative" }}>
      <div style={{ position: "fixed", top: "50px" }}>
        <h2>Throttling</h2>
        <div>
          <h3> Normal : {top}</h3>
        </div>
        <div>
          <h3> Throttled : {throttledValue}</h3>
        </div>
      </div>
    </div>
  );
}
