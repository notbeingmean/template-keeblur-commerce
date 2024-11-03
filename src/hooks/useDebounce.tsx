import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number = 500): [T, boolean] {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return [debouncedValue, loading];
}

export default useDebounce;
