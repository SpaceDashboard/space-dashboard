import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { showToast } from 'src/shared/utils';

interface StatusResult {
  monitors: { status: number }[];
}

// Test
const fetchSiteAssetStatuses = async (): Promise<number> => {
  const response = await fetch(
    `${import.meta.env.VITE_STATUS_URL}/json/status-monitors.json`,
  );
  const result: StatusResult = await response.json();
  // 0 - Paused
  // 1 - Not checked yet
  // 2 - Up
  // 8 - Possibly down
  // 9 - Down

  let downCount = 0;
  try {
    result.monitors.forEach((monitor) => {
      if (monitor.status === 8 || monitor.status === 9) {
        downCount++;
      }
    });
  } catch (error) {
    throw new Error('Error fetching statuses: ' + error);
  }

  return downCount;
};

export const SiteMonitors: React.FC = () => {
  const { data: downSites = 0, error } = useQuery({
    queryKey: ['site-monitors'],
    queryFn: fetchSiteAssetStatuses,
    refetchInterval: 1000 * 60 * 3, // 3 minutes
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching statuses:', error);
    } else if (downSites > 0) {
      const message =
        downSites > 1
          ? 'Apologies, multiple sites providing data for Space Dashboard are down'
          : 'Apologies, a site providing data for Space Dashboard is down';
      showToast(message, { variant: 'error' }, true);
    }
  }, [downSites, error, showToast]);

  return null; // No need to render anything
};
