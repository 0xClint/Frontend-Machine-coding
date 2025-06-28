import React, { useEffect, useState } from "react";
import { useThrottle } from "./useThrottle";

export const ScreenAdjust = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  const throttledHandleResize = useThrottle(handleResize, 500);

  useEffect(() => {
    window.addEventListener("resize", throttledHandleResize);

    return () => window.removeEventListener("resize", throttledHandleResize);
  }, []);

  return (
    <div>
      Window Size : {windowSize.width} X {windowSize.height}
    </div>
  );
};
