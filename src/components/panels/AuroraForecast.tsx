import React from 'react';
import { Panel, PanelBody, PanelProps } from 'src/components/base';

export const AuroraForecast: React.FC<PanelProps> = ({ ...props }) => {
  return (
    <Panel {...props}>
      <PanelBody>
        <img
          src="http://api.spacedashboard.com/img/aurora-forecast-northern-hemisphere.jpg?lastrefresh=1555873922"
          style={{ width: '100%', maxWidth: '300px' }}
          alt="test"
        />
      </PanelBody>
    </Panel>
  );
};
