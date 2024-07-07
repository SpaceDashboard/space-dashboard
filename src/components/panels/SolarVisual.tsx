import React from 'react';
import {
  Panel,
  PanelBody,
  PanelProps,
  FadeFromBlack,
} from 'src/components/base';

export const SolarVisual: React.FC<PanelProps> = ({ index }) => {
  return (
    <Panel index={index}>
      <PanelBody>
        <FadeFromBlack>
          <img
            src="https://api.spacedashboard.com/img/current-corona.jpg"
            style={{ width: '100%', maxWidth: '400px' }}
            alt="Current visual of the sun"
          />
        </FadeFromBlack>
      </PanelBody>
    </Panel>
  );
};
