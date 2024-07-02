import React from 'react';
import { Panel, PanelBody, PanelProps } from 'src/components/base';

export const IssFeed1: React.FC<PanelProps> = ({ ...props }) => {
  return (
    <Panel {...props}>
      <PanelBody>
        <iframe
          className="aspect-16-9"
          src="https://www.youtube.com/embed/jPTD2gnZFUw?autoplay=1&mute=1"
          title="YouTube video player - ISS Live View"
          allow="autoplay; accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder={0}
        ></iframe>
      </PanelBody>
    </Panel>
  );
};
