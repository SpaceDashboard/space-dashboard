import React from 'react';
import {
  Panel,
  PanelBody,
  PanelProps,
  FadeFromBlack,
} from 'src/components/base';

export const AuroraForecast: React.FC<PanelProps> = ({ ...props }) => {
  return (
    <Panel {...props}>
      <PanelBody>
        <FadeFromBlack>
          <img
            src="http://api.spacedashboard.com/img/aurora-forecast-northern-hemisphere.jpg?lastrefresh=1555873922"
            style={{ width: '100%', maxWidth: '400px' }}
            alt="test"
          />
        </FadeFromBlack>
      </PanelBody>
    </Panel>
  );
};
