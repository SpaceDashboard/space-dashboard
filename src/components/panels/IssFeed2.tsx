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

export const IssFeed2: React.FC<PanelProps> = ({ index, componentKey }) => {
  const { issLiveFeedVideoId2 } = useAppContext();
  const {
    settings: {
      panelConfigs: { IssFeed2 },
    },
  } = useSettingsContext();

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={`https://www.youtube.com/embed/${IssFeed2.videoIdOverride || issLiveFeedVideoId2}?autoplay=${IssFeed2.autoPlay}&mute=${IssFeed2.mute}`}
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
