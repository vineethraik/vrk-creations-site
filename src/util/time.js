import { useEffect, useState } from "react";

export const useTimeCounter = () => {
  const [count, setCount] = useState(0);
  const [onZero, setOnZero] = useState(() => () => {});
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount === 1) {
          typeof onZero === "function" && onZero();
          console.log("zero on system");
        }
        return prevCount <= 0 ? 0 : prevCount - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [count, onZero]);

  const minutes = Math.floor(count / 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
  const seconds = Math.floor(count % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });

  return {
    count,
    minutes,
    seconds,
    setCount,
    clearCounter: () => setCount(0),
    setOnZero,
  };
};
