import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { css, cx } from '@emotion/css';
import { UTCDate } from '@date-fns/utc';
import { format } from 'date-fns';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelMenu,
  SpecialPanelActions,
  PlanetsLoader,
  FlexWrapper,
  Toggle,
} from 'src/components/base';
import { UtcClock } from 'src/components';
import { IconX } from '@tabler/icons-react';
import { getCurrentTimestamp } from 'src/shared/utils';
import { useSpecialBroadcast, useSettingsContext } from 'src/hooks';

const ASPECT_RATIO_CLASS = 'aspect-16-9';

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
    dataUpdatedAt,
    isLoading: isStatusLoading,
    isError,
    refetch,
  } = useSpecialBroadcast();
  const { broadcast: broadcastData } = data || {};
  const { settings, updateSettings } = useSettingsContext();
  const [isBroadcastActive, setIsBroadcastActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');

  const persistBroadcast = settings.persistBroadcast;

  const broadcastTimeRange = useMemo(() => {
    if (!broadcastData) return null;
    return {
      start: new UTCDate(broadcastData.startTimeUTC),
      end: new UTCDate(broadcastData.endTimeUTC),
    };
  }, [broadcastData]);

  const setPersistBroadcast = useCallback(
    (persist: boolean) => {
      updateSettings({ persistBroadcast: persist });
    },
    [updateSettings],
  );

  // Restore broadcast active state from persisted settings
  useEffect(() => {
    if (persistBroadcast && broadcastData && !isBroadcastActive) {
      const isGtEqStartTime =
        new UTCDate() >= new Date(broadcastData.startTimeUTC);
      if (isGtEqStartTime) {
        setIsBroadcastActive(true);
      }
    }
  }, [persistBroadcast, broadcastData, isBroadcastActive]);

  // Clear persisted state if startTime is in the future (new broadcast)
  useEffect(() => {
    if (!broadcastData || !persistBroadcast) return;
    const isGtEqStartTime =
      new UTCDate() >= new Date(broadcastData.startTimeUTC);
    if (!isGtEqStartTime) {
      setPersistBroadcast(false);
    }
  }, [broadcastData, persistBroadcast, setPersistBroadcast]);

  // Reusable broadcast timing check
  const checkBroadcastTiming = useCallback(() => {
    const now = new UTCDate();
    return !!(
      broadcastData &&
      now >= new Date(broadcastData.startTimeUTC) &&
      now <= new Date(broadcastData.endTimeUTC)
    );
  }, [broadcastData]);

  // Re-check broadcast timing on every successful refetch
  useEffect(() => {
    if (broadcastData) {
      const shouldBeActive = checkBroadcastTiming();
      const isGtEqStartTime =
        new UTCDate() >= new Date(broadcastData.startTimeUTC);
      if (persistBroadcast && isGtEqStartTime) {
        return;
      }

      if (shouldBeActive !== isBroadcastActive) {
        setIsBroadcastActive(shouldBeActive);
      }
    }
  }, [
    broadcastData,
    dataUpdatedAt,
    isBroadcastActive,
    checkBroadcastTiming,
    persistBroadcast,
  ]);

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
      <SpecialPanelActions>
        <div className="special-broadcast-title-wrapper">
          <h4 className="special-broadcast-title">Special Broadcast</h4>
          <div className="special-broadcast-time-wrapper">
            <small className="special-broadcast-time">
              (
              {broadcastTimeRange?.start &&
                format(broadcastTimeRange.start, 'HH:mm')}{' '}
              -{' '}
              {broadcastTimeRange?.end &&
                format(broadcastTimeRange.end, 'HH:mm')}
              )
            </small>
            <small className="special-broadcast-time">
              <UtcClock />
            </small>
          </div>
        </div>
        <Toggle
          label="Keep alive"
          tooltip="Prevent this broadcast from ending at the scheduled time"
          justifyContent="flex-end"
          wrapperJustifyContent="flex-end"
          hideLabelDivider={true}
          tooltipDelay={0}
          size="sm"
          checked={persistBroadcast}
          onChange={(checked) => {
            setPersistBroadcast(checked);
          }}
        />
      </SpecialPanelActions>
      <PanelMenu variant="special">
        <h3>{broadcastData?.title}</h3>
        <p
          dangerouslySetInnerHTML={{
            __html:
              broadcastData?.description || '<p>No description available</p>',
          }}
        />
      </PanelMenu>
      <PanelActions
        variant="special"
        refreshData={() => {
          refetch();
        }}
        refreshTooltip="Refresh broadcast data"
      />
    </Panel>
  );
};
