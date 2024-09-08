import React, { useEffect } from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  Button,
  FadeFromBlack,
} from 'src/components/base';
import { useAppContext } from 'src/hooks';

const iframeCss = css`
  background: #000;
`;

export const DeepSpaceNetwork: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const { navAnimationSeconds } = useAppContext();
  const [iframeSrc, setIframeSrc] = React.useState('');

  // Delaying the iframe load to allow for smoother animation
  // of other panels, attempting to improve visual performance
  useEffect(() => {
    setTimeout(
      () => {
        setIframeSrc('https://eyes.nasa.gov/dsn/dsn.html');
      },
      navAnimationSeconds * 1000 + 3000,
    );
  }, []);

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={iframeSrc}
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
