import { useEffect, useState, useRef } from 'react';

interface UseAutoRefreshProps<T> {
  data: T | null;
  isFetching: boolean;
  resetTimer: () => void;
}

/**
 * @description
 * A hook to automatically refresh data at a specified interval.
 *
 * @param fetchData - A function that returns a Promise of the data.
 * @param delay - Optional time in milliseconds to wait before refreshing the data. Defaults to 5 minutes.
 *
 * @returns An object with the following properties:
 *   - `data`: The current data.
 *   - `isFetching`: Whether the data is currently being fetched.
 *   - `resetTimer`: A function to reset the timer, which will also refresh the data.
 */
export const useAutoRefresh = <T,>(
  fetchData: () => Promise<T> | T | void,
  delay = 300000,
): UseAutoRefreshProps<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);

  const getData = async () => {
    setIsFetching(true);
    try {
      const result = await Promise.resolve(fetchData());
      if (result !== undefined) {
        setData(result as T);
      }
      setIsFetching(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsFetching(false);
    }
  };

  const resetTimer = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
    }

    intervalIdRef.current = setInterval(() => {
      getData();
    }, delay);
  };

  useEffect(() => {
    resetTimer();

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [fetchData, delay]);

  return { data, isFetching, resetTimer };
};
