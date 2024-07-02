import React from 'react';
import { Panel, PanelBody, PanelProps } from 'src/components/base';

export const CurrentSolarVisual: React.FC<PanelProps> = ({ ...props }) => {
  return (
    <Panel {...props}>
      <PanelBody>
        <img
          src="https://api.spacedashboard.com/img/current-corona.jpg"
          style={{ width: '100%', maxWidth: '400px' }}
          alt="Current visual of the sun"
        />
      </PanelBody>
    </Panel>
  );
};
