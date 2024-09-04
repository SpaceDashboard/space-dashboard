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

export const SolarVisual: React.FC<PanelProps> = ({ index, componentKey }) => {
  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <img
            src="https://api.spacedashboard.com/img/current-corona.jpg"
            style={{ width: '100%', maxWidth: '400px' }}
            alt="Current visual of the sun"
          />
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
