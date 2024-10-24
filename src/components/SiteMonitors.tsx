import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { showToast } from 'src/shared/utils';

const monitorNames = [
  'Space Dashboard',
  'ISS Tracker',
  'JPL Solar System Dynamics',
  'NASA NEO API',
  'People in Space',
  'SWPC NOAA - Services',
  'Deep Space Network',
];

interface StatusResult {
  data: { status: string; paused: boolean }[];
}

const fetchSiteAssetStatuses = async (): Promise<number> => {
  const response = await fetch(
    `${import.meta.env.VITE_STATUS_URL}/json/status-monitors.json`,
  );
  const result: StatusResult = await response.json();

  let downCount = 0;
  monitorNames.forEach((_, index) => {
    const monitor = result.data[index];
    if (!monitor.paused && monitor.status === 'down') {
      downCount++;
    }
  });

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
      showToast('Error fetching site statuses', { variant: 'error' });
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
