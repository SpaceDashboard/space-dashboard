import React, { useEffect, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import { UTCDate } from '@date-fns/utc';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelMenu,
  PlanetsLoader,
  FlexWrapper,
} from 'src/components/base';
import { IconX } from '@tabler/icons-react';
import { getCurrentTimestamp } from 'src/shared/utils';
import { useSpecialBroadcast } from 'src/hooks';

const ASPECT_RATIO_CLASS = 'aspect-16-9';
const BROADCAST_REFRESH_INTERVAL = 2 * 60 * 1000; // Refetch every 2 minutes

const iframeCss = css`
  background: #000;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
`;

export const SpecialBroadcast: React.FC = () => {
  const {
    data,
    isLoading: isStatusLoading,
    isError,
    refetch,
  } = useSpecialBroadcast();
  const { broadcast: broadcastData } = data || {};
  const [isBroadcastActive, setIsBroadcastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');

  // Check broadcast timing immediately when data becomes available
  useEffect(() => {
    if (broadcastData) {
      const now = new UTCDate();
      const shouldBeActive = !!(
        broadcastData &&
        now >= new Date(broadcastData.startTimeUTC) &&
        now <= new Date(broadcastData.endTimeUTC)
      );

      if (shouldBeActive !== isBroadcastActive) {
        setIsBroadcastActive(shouldBeActive);
      }
    }
  }, [broadcastData, isBroadcastActive]);

  // Check and refetch every so often
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new UTCDate();
      const shouldBeActive = !!(
        broadcastData &&
        now >= new Date(broadcastData.startTimeUTC) &&
        now <= new Date(broadcastData.endTimeUTC)
      );

      if (shouldBeActive !== isBroadcastActive) {
        setIsBroadcastActive(shouldBeActive);
      }

      // Refetch data to get latest broadcast info
      refetch();
    }, BROADCAST_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [broadcastData, isBroadcastActive, refetch]);

  // Memoize the iframe base URL to prevent unnecessary recalculations
  const iframeBase = useMemo(() => {
    if (!broadcastData?.videoId) return '';
    return `https://www.youtube-nocookie.com/embed/${broadcastData.videoId}?autoplay=1&mute=1`;
  }, [broadcastData?.videoId]);

  // Update iframe source when the base URL changes
  useEffect(() => {
    if (iframeBase) {
      const newSrc = `${iframeBase}&updated=${getCurrentTimestamp()}`;
      setIframeSrc(newSrc);
      setIsLoading(true);
    }
  }, [iframeBase]);

  if (!isBroadcastActive) {
    return null;
  }

  return (
    <Panel index={0} componentKey="special-broadcast" variant="special">
      <PanelBody>
        <PlanetsLoader showLoader={isLoading || isStatusLoading} />
        {isError ? (
          <div
            className={cx(
              ASPECT_RATIO_CLASS,
              iframeCss,
              css`
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                background: #111;
                text-align: center;
                padding: 1rem;
              `,
            )}
          >
            <FlexWrapper
              alignItems="center"
              flexDirection="column"
              gap={12}
              justifyContent="center"
            >
              <FlexWrapper
                alignItems="center"
                justifyContent="center"
                style={{
                  height: '25px',
                  width: '25px',
                  backgroundColor: 'rgba(255, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 0, 0, 0.6)',
                  borderRadius: '50%',
                }}
              >
                <IconX size={14} />
              </FlexWrapper>
              <div>
                <h3>This broadcast is not available at this time.</h3>
              </div>
            </FlexWrapper>
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <iframe
              className={cx('aspect-16-9', iframeCss)}
              src={iframeSrc}
              onLoad={() => {
                setIsLoading(false);
              }}
              onError={(e) => {
                console.error('Iframe error:', e);
                setShowOfflineMessage(true);
              }}
              title={broadcastData?.title || 'Special Broadcast'}
              allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
              allowFullScreen
              tabIndex={-1}
            />
          </div>
        )}
        {showOfflineMessage && !isLoading && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              padding: '0.5rem',
              textAlign: 'center' as const,
            }}
          >
            The video player failed to load. The feed may be temporarily
            unavailable.
          </div>
        )}
      </PanelBody>
      <PanelMenu variant="special">
        <h3>{broadcastData?.title}</h3>
        <p>{broadcastData?.description}</p>
      </PanelMenu>
      <PanelActions
        variant="special"
        refreshData={() => {
          refetch();
        }}
      />
    </Panel>
  );
};
