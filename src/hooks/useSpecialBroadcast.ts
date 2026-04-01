import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface SpecialBroadcast {
  broadcast: {
    title: string;
    description: string;
    videoId: string;
    startTimeUTC: string;
    endTimeUTC: string;
  };
}

export const useSpecialBroadcast = () => {
  const { data, error, isLoading, refetch } = useQuery<SpecialBroadcast, Error>(
    {
      queryKey: ['specialBroadcast'],
      queryFn: async () => {
        try {
          const response = await axios.get<SpecialBroadcast>(
            `${import.meta.env.VITE_API_URL}/v1/json/special-broadcast.json`,
          );
          return response.data;
        } catch (error) {
          console.error('Error fetching special broadcast:', error);
          throw new Error('Failed to load special broadcast');
        }
      },
      staleTime: 0,
    },
  );

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    refetch,
  };
};
