import React, {
  useMemo,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  PlanetsLoader,
  FadeFromBlack,
} from 'src/components/base';
import { useSettingsContext, useVideoStatus, useAppContext } from 'src/hooks';
import { IssFeedSettings } from 'src/components/modals/UserSettings/panel-settings';
import { getCurrentTimestamp } from 'src/shared/utils';
import { showToast } from 'src/shared/utils/toast';
import { FlexWrapper } from 'src/components/base';
import { IconX } from '@tabler/icons-react';

const ASPECT_RATIO_CLASS = 'aspect-16-9';

const iframeCss = css`
  background: #000;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
`;

type FeedName = 'IssFeed1' | 'IssFeed2' | 'IssFeed3';

const FEED_TO_JSON_KEY: Record<FeedName, string> = {
  IssFeed1: 'issLiveFeedVideoId1',
  IssFeed2: 'issLiveFeedVideoId2',
  IssFeed3: 'issLiveFeedVideoId3',
};

interface IssFeedBaseProps extends Pick<PanelProps, 'index' | 'componentKey'> {
  feedName: FeedName;
  iframeTitle?: string;
  menuContent: ReactNode;
}

export const IssFeedBase: React.FC<IssFeedBaseProps> = ({
  componentKey,
  feedName,
  iframeTitle = '',
  index,
  menuContent,
}) => {
  const { settings } = useSettingsContext();
  const panelConfig = settings.panelConfigs[feedName as FeedName];
  const { data: videoStatus, isLoading: isStatusLoading } = useVideoStatus();
  const appContext = useAppContext();

  const FEED_TO_SETTER: Record<FeedName, (id: string) => void> = {
    IssFeed1: appContext.setIssLiveFeedVideoId1,
    IssFeed2: appContext.setIssLiveFeedVideoId2,
    IssFeed3: appContext.setIssLiveFeedVideoId3,
  };

  const videoId = useMemo(() => {
    if (!videoStatus) return '';
    const jsonKey = FEED_TO_JSON_KEY[feedName];
    return videoStatus[jsonKey]?.videoId || '';
  }, [videoStatus, feedName]);

  useEffect(() => {
    const setFeedId = FEED_TO_SETTER[feedName];
    if (setFeedId) {
      setFeedId(videoId);
    }
  }, [feedName, videoId]);

  const videoIsBeingOverridden = useMemo(() => {
    if (!videoId || !panelConfig.videoIdOverride) return false;
    return panelConfig.videoIdOverride !== videoId;
  }, [panelConfig, videoId]);

  const feedId = useMemo(
    () => panelConfig.videoIdOverride || videoId,
    [panelConfig, videoId],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');

  // Memoize the iframe base URL to prevent unnecessary recalculations
  const iframeBase = useMemo(() => {
    if (!feedId) return '';
    return `https://www.youtube-nocookie.com/embed/${feedId}?autoplay=${panelConfig.autoPlay ? 1 : 0}&mute=${panelConfig.mute ? 1 : 0}`;
  }, [feedId, panelConfig.autoPlay, panelConfig.mute]);

  // Update iframe source when the base URL changes
  useEffect(() => {
    if (iframeBase) {
      const newSrc = `${iframeBase}&updated=${getCurrentTimestamp()}`;
      setIframeSrc(newSrc);
      setIsLoading(true);
    }
  }, [iframeBase]);

  // Check if the current video is online
  const { isVideoOnline, isLoading: isVideoStatusLoading } = useMemo(() => {
    if (videoIsBeingOverridden) {
      return { isVideoOnline: true, isLoading: false };
    }
    if (isStatusLoading || !videoStatus) {
      return { isVideoOnline: false, isLoading: true };
    }

    const jsonKey = FEED_TO_JSON_KEY[feedName];
    const videoData = videoStatus[jsonKey];

    // If we have a feedId but no matching video data, assume online
    const onlineStatus = feedId
      ? videoData
        ? videoData.status === 'ONLINE'
        : true
      : false;

    return {
      isVideoOnline: onlineStatus,
      isLoading: false,
    };
  }, [
    videoStatus,
    videoId,
    feedId,
    isStatusLoading,
    feedName,
    videoIsBeingOverridden,
  ]);

  const refreshIframe = useCallback(() => {
    if (!isVideoOnline) {
      showToast('This feed is currently offline', { variant: 'error' });
      return;
    }
    setIsLoading(true);
    const newSrc = `${iframeBase}&updated=${getCurrentTimestamp()}`;
    setIframeSrc(newSrc);
  }, [iframeBase, isVideoOnline]);

  const isInitialLoad = useMemo(() => {
    return (isVideoStatusLoading || !feedId) && !showOfflineMessage;
  }, [isVideoStatusLoading, feedId, showOfflineMessage]);

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <PlanetsLoader
            showLoader={isInitialLoad || (isVideoOnline && isLoading)}
          />
          {isInitialLoad ? (
            <div
              className={cx(
                ASPECT_RATIO_CLASS,
                iframeCss,
                css`
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: #111;
                `,
              )}
            ></div>
          ) : (
            <>
              {!isVideoOnline ? (
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
                      <h3>This feed is currently offline</h3>
                      <p style={{ fontSize: '0.9rem' }}>
                        We'll automatically check for updates
                      </p>
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
                      console.log('Iframe loaded:', iframeSrc);
                      setIsLoading(false);
                    }}
                    onError={(e) => {
                      console.error('Iframe error:', e);
                      setShowOfflineMessage(true);
                    }}
                    title={iframeTitle}
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
            </>
          )}
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        {menuContent}
        <IssFeedSettings feedName={feedName} />
      </PanelMenu>
      <PanelActions
        refreshData={() => refreshIframe()}
        refreshTooltip="Reload video"
      />
    </Panel>
  );
};
