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
import { IssFeed2Settings } from '../modals/UserSettings/panel-settings';

const iframeCss = css`
  background: #000;
`;

export const IssFeed2: React.FC<PanelProps> = ({ index, componentKey }) => {
  const { issLiveFeedVideoId2 } = useAppContext();
  const {
    settings: {
      panelConfigs: { IssFeed2 },
    },
  } = useSettingsContext();
  const issFeedId = useMemo(
    () => IssFeed2.videoIdOverride || issLiveFeedVideoId2,
    [IssFeed2, issLiveFeedVideoId2],
  );

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={`https://www.youtube.com/embed/${issFeedId}?autoplay=${IssFeed2.autoPlay}&mute=${IssFeed2.mute}`}
            title="YouTube video player - Live High-Definition Views from ISS"
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
            {'Live High-Definition Views from the International Space Station'}
          </a>
        </p>
        <p>
          {
            'More information for the ISS HD Earth Viewing Experiment can be found here: '
          }
          <br />
          <a
            href="https://eol.jsc.nasa.gov/ESRS/HDEV/"
            target="_blank"
            rel="noreferrer"
          >
            {'NASA High Definition Earth-Viewing System'}
          </a>
        </p>
        <IssFeed2Settings />
      </PanelMenu>
      <PanelActions />
    </Panel>
  );
};
