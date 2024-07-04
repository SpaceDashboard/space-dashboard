import React from 'react';
import {
  Panel,
  PanelBody,
  PanelProps,
  FadeFromBlack,
} from 'src/components/base';
import { useAppContext } from '../../hooks';

export const IssFeed2: React.FC<PanelProps> = ({ ...props }) => {
  const { issLiveHDViewsAutoPlay, issLiveHDViewsMute } = useAppContext();
  return (
    <Panel {...props}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className="aspect-16-9"
            src={`https://www.youtube.com/embed/P9C25Un7xaM?autoplay=${issLiveHDViewsAutoPlay}&mute=${issLiveHDViewsMute}`}
            title="YouTube video player - Live High-Definition Views from ISS"
            allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowFullScreen
            frameBorder={0}
          ></iframe>
        </FadeFromBlack>
      </PanelBody>
    </Panel>
  );
};
