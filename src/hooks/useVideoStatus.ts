import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useMemo } from 'react';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://api.spacedashboard.com';

interface VideoStatus {
  [key: string]: {
    videoId: string;
    description: string;
    status: 'ONLINE' | 'OFFLINE';
  };
}

export const useVideoStatus = () => {
  const { data, error, isLoading } = useQuery<VideoStatus, Error>({
    queryKey: ['videoStatus'],
    queryFn: async () => {
      try {
        const response = await axios.get<VideoStatus>(
          `${API_URL}/json/live-video-ids.json`,
        );
        return response.data;
      } catch (error) {
        console.error('Error fetching video status:', error);
        throw new Error('Failed to load video status');
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes
  });

  return useMemo(
    () => ({
      data,
      error,
      isLoading,
      isError: !!error,
    }),
    [data, error, isLoading],
  );
};
