import { useEffect, useState } from "react";

// export const useDebounce = (value: any, delay: number) => {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   const debounceFunc = debounce(setDebouncedValue, delay);
//   debounceFunc(value);
//   return debouncedValue;
// };

// function debounce(cb: any, delay: number) {
//   let timer: any;

//   return function (...arg: any[]) {
//     if (timer) clearTimeout(timer);
//     timer = setTimeout(() => {
//       cb(...arg);
//     }, delay);
//   };
// }

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
