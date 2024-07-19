import React from 'react';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  Button,
  FadeFromBlack,
} from 'src/components/base';
import { useSettingsContext } from 'src/hooks';

export const IssFeed2: React.FC<PanelProps> = ({ index }) => {
  const {
    settings: { issLiveHDViewsAutoPlay, issLiveHDViewsMute },
  } = useSettingsContext();
  return (
    <Panel index={index}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className="aspect-16-9"
            src={`https://www.youtube.com/embed/P9C25Un7xaM?autoplay=${issLiveHDViewsAutoPlay}&mute=${issLiveHDViewsMute}`}
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
