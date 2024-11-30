import { useEffect, useRef, useState } from "react";

export const useDebounce = <T>(value: T, delay: number) => {
  const timer = useRef<NodeJS.Timer | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, [value, delay]);

  return debouncedValue;
};
