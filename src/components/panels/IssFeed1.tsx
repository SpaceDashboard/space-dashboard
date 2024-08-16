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
import { IconHelpCircle } from '@tabler/icons-react';

const iframeCss = css`
  background: #000;
`;

export const IssFeed1: React.FC<PanelProps> = ({ index }) => {
  const { issLiveFeedVideoId1 } = useAppContext();
  const {
    settings: { issLiveViewAutoPlay, issLiveViewMute },
  } = useSettingsContext();
  return (
    <Panel index={index}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={`https://www.youtube.com/embed/${issLiveFeedVideoId1}?autoplay=${issLiveViewAutoPlay}&mute=${issLiveViewMute}`}
            title="YouTube video player - ISS Live View"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
          ></iframe>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        {'This is a test'}
        <Button variantsList={['small']}>Button</Button>
      </PanelMenu>
      <PanelActions refreshData={() => console.log('Refresh clicked')}>
        <Button
          Icon={IconHelpCircle}
          isPanelAction={true}
          tooltipTitle="Test"
          variantsList={['small', 'secondary']}
        ></Button>
      </PanelActions>
    </Panel>
  );
};
