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
import { css, cx } from '@emotion/css';

const iframeCss = css`
  background: #000;
`;

export const DeepSpaceNetwork: React.FC<PanelProps> = ({ index }) => {
  return (
    <Panel index={index}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src="https://eyes.nasa.gov/dsn/dsn.html"
            scrolling="no"
          ></iframe>
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
