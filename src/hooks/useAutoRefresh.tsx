import { useEffect, useState, useRef } from 'react';

interface UseAutoRefreshProps<T> {
  data: T | null;
  isFetching: boolean;
  resetTimer: () => void;
}

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
