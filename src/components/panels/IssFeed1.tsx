import React from 'react';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  Button,
  FadeFromBlack,
  PanelMenu,
} from 'src/components/base';
import { useAppContext } from '../../hooks';

export const IssFeed1: React.FC<PanelProps> = ({ index }) => {
  const { issLiveViewAutoPlay, issLiveViewMute } = useAppContext();
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
            frameBorder={0}
          ></iframe>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        {'This is a test'}
        <Button variantsList={['secondary']}>Button</Button>
      </PanelMenu>
      <PanelActions>
        <Button variantsList={['small', 'secondary']}>Refresh</Button>
      </PanelActions>
    </Panel>
  );
};
