import React, { useMemo } from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  FadeFromBlack,
} from 'src/components/base';
import { useAppContext, useSettingsContext } from 'src/hooks';
import { IssFeed1Settings } from '../modals/UserSettings/panel-settings';

const iframeCss = css`
  background: #000;
`;

export const IssFeed1: React.FC<PanelProps> = ({ index, componentKey }) => {
  const { issLiveFeedVideoId1 } = useAppContext();
  const {
    settings: {
      panelConfigs: { IssFeed1 },
    },
  } = useSettingsContext();
  const issFeedId = useMemo(
    () => IssFeed1.videoIdOverride || issLiveFeedVideoId1,
    [IssFeed1, issLiveFeedVideoId1],
  );

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={`https://www.youtube.com/embed/${issFeedId}?autoplay=${IssFeed1.autoPlay}&mute=${IssFeed1.mute}`}
            title="YouTube video player - ISS Live View"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        <p>
          {'Credit: '}
          <a
            href={`https://www.youtube.com/watch?v=${issFeedId}`}
            target="_blank"
            rel="noreferrer"
          >
            {'Live Video from the International Space Station'}
          </a>
        </p>
        <IssFeed1Settings />
      </PanelMenu>
      <PanelActions />
    </Panel>
  );
};
