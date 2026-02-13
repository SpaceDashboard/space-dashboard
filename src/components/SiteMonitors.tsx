import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { showToast } from 'src/shared/utils';

type Monitor = {
  status: string;
  url: string;
  friendlyName: string;
};

interface StatusResult {
  data: Monitor[];
}

const fetchSiteAssetStatuses = async (): Promise<number> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/v2/json/status-monitors.json`,
  );
  const result: StatusResult = await response.json();

  let downCount = 0;
  try {
    result.data.forEach((monitor) => {
      if (monitor.status !== 'UP') {
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
        downSites > 1 ? (
          <div>
            Apologies, multiple sites providing data for{' '}
            <a
              href="https://status.spacedashboard.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Space Dashboard are down
            </a>
          </div>
        ) : (
          <div>
            Apologies, a site providing data for{' '}
            <a
              href="https://status.spacedashboard.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Space Dashboard is down
            </a>
          </div>
        );
      showToast(message, { variant: 'error' }, true);
    }
  }, [downSites, error, showToast]);

  return null; // No need to render anything
};
