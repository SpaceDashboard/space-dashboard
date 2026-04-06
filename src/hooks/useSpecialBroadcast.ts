import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { getCurrentTimestamp } from 'src/shared/utils';

interface SpecialBroadcast {
  broadcast: {
    title: string;
    description: string;
    videoId: string;
    startTimeUTC: string;
    endTimeUTC: string;
  };
}

const BROADCAST_REFRESH_INTERVAL = 2 * 60 * 1000; // 2 minutes

export const useSpecialBroadcast = () => {
  const { data, error, isLoading, refetch, dataUpdatedAt } = useQuery<
    SpecialBroadcast,
    Error
  >({
    queryKey: ['specialBroadcast'],
    queryFn: async () => {
      try {
        const response = await axios.get<SpecialBroadcast>(
          `${import.meta.env.VITE_API_URL}/v1/json/special-broadcast.json`,
          {
            params: { u: getCurrentTimestamp() },
          },
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching special broadcast:', error);
        throw new Error('Failed to load special broadcast');
      }
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchInterval: BROADCAST_REFRESH_INTERVAL,
  });

  return {
    data,
    dataUpdatedAt,
    error,
    isLoading,
    isError: !!error,
    refetch,
  };
};
