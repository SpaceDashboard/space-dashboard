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

export const AuroraForecast: React.FC<PanelProps> = ({ index }) => {
  return (
    <Panel index={index}>
      <PanelBody>
        <FadeFromBlack>
          <img
            src="http://api.spacedashboard.com/img/aurora-forecast-northern-hemisphere.jpg?lastrefresh=1555873922"
            style={{ width: '100%', maxWidth: '400px' }}
            alt="test"
          />
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        {'This is a test'}
        <Button variantsList={['small']}>Button</Button>
      </PanelMenu>
      <PanelActions>
        <Button
          variantsList={['small', 'secondary']}
          onClick={() => console.log('Refresh clicked')}
        >
          Refresh
        </Button>
      </PanelActions>
    </Panel>
  );
};
