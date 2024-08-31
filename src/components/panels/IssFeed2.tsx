import React from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  Button,
  FadeFromBlack,
} from 'src/components/base';
import { useAppContext, useSettingsContext } from 'src/hooks';

const iframeCss = css`
  background: #000;
`;

export const IssFeed2: React.FC<PanelProps> = ({ index }) => {
  const { issLiveFeedVideoId2 } = useAppContext();
  const {
    settings: { issLiveHDViewsAutoPlay, issLiveHDViewsMute },
  } = useSettingsContext();

  return (
    <Panel index={index}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={`https://www.youtube.com/embed/${issLiveFeedVideoId2}?autoplay=${issLiveHDViewsAutoPlay}&mute=${issLiveHDViewsMute}`}
            title="YouTube video player - Live High-Definition Views from ISS"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        {'This is a test'}
        <Button variantsList={['small']}>Button</Button>
      </PanelMenu>
      <PanelActions
        refreshData={() => console.log('Refresh clicked')}
      ></PanelActions>
    </Panel>
  );
};
