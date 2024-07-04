import React from 'react';
import {
  Panel,
  PanelBody,
  PanelProps,
  FadeFromBlack,
} from 'src/components/base';

export const CurrentSolarVisual: React.FC<PanelProps> = ({ ...props }) => {
  return (
    <Panel {...props}>
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
