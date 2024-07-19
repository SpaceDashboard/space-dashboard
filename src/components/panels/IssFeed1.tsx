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

export const IssFeed1: React.FC<PanelProps> = ({ index }) => {
  const {
    settings: { issLiveViewAutoPlay, issLiveViewMute },
  } = useSettingsContext();
  return (
    <Panel index={index}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className="aspect-16-9"
            src={`https://www.youtube.com/embed/VdFK-xs_r-4?autoplay=${issLiveViewAutoPlay}&mute=${issLiveViewMute}`}
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
      <PanelActions
        refreshData={() => console.log('Refresh clicked')}
      ></PanelActions>
    </Panel>
  );
};
