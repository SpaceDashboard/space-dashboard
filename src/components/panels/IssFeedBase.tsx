import React, { useMemo, useState, ReactNode, useEffect } from 'react';
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
import { useAppContext, useSettingsContext } from 'src/hooks';
import { IssFeedSettings } from 'src/components/modals/UserSettings/panel-settings';
import { getCurrentTimestamp } from 'src/shared/utils';

const iframeCss = css`
  background: #000;
`;

type FeedName = 'IssFeed1' | 'IssFeed2' | 'IssFeed3';

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
  const {
    issLiveFeedVideoId1 = '',
    issLiveFeedVideoId2 = '',
    issLiveFeedVideoId3 = '',
  } = useAppContext();
  const { settings } = useSettingsContext();
  const panelConfig = settings.panelConfigs[feedName as FeedName];
  let videoId = '';
  switch (feedName) {
    case 'IssFeed1':
      videoId = issLiveFeedVideoId1;
      break;
    case 'IssFeed2':
      videoId = issLiveFeedVideoId2;
      break;
    case 'IssFeed3':
      videoId = issLiveFeedVideoId3;
      break;
    default:
      videoId = '';
  }
  const feedId = useMemo(
    () => panelConfig.videoIdOverride || videoId,
    [panelConfig, videoId],
  );
  const [isLoading, setIsLoading] = useState(false);
  const iframeBase = `https://www.youtube-nocookie.com/embed/${feedId}?autoplay=${panelConfig.autoPlay}&mute=${panelConfig.mute}`;
  const [iframeSrc, setIframeSrc] = useState(`
    ${iframeBase}&updated=${getCurrentTimestamp()}
  `);

  const refreshIframe = () => {
    setIsLoading(true);
    setIframeSrc(`${iframeBase}&updated=${getCurrentTimestamp()}`);
  };

  useEffect(() => {
    setIframeSrc(`${iframeBase}&updated=${getCurrentTimestamp()}`);
  }, [panelConfig.autoPlay, panelConfig.mute]);

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <PlanetsLoader showLoader={isLoading} />
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={iframeSrc}
            onLoad={() => setIsLoading(false)}
            title={iframeTitle}
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
            tabIndex={-1}
          />
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
