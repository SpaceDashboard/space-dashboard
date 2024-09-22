import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  Button,
  FadeFromBlack,
  PlanetsLoader,
} from 'src/components/base';
import { useAppContext } from 'src/hooks';

const iframeCss = css`
  background: #000;
  min-height: 500px;
  max-height: 88vh;
`;

export const DeepSpaceNetwork: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const { navAnimationSeconds } = useAppContext();
  const getCurrentTimestamp = () => new Date().getTime();
  const dsnSource = 'https://eyes.nasa.gov/dsn/dsn.html';
  const [iframeSrc, setIframeSrc] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const refreshIframe = () => {
    setIsLoading(true);
    setIframeSrc(`${dsnSource}?u=${getCurrentTimestamp()}`);
  };

  // Delaying the iframe load to allow for smoother animation
  // of other panels, attempting to improve visual performance
  useEffect(() => {
    setTimeout(
      () => {
        setIframeSrc(`${dsnSource}?u=${getCurrentTimestamp()}`);
      },
      navAnimationSeconds * 1000 + 3000,
    );
  }, []);

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <PlanetsLoader showLoader={isLoading} />
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={iframeSrc}
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        {'This is a test'}
        <Button variantsList={['small']}>Button</Button>
      </PanelMenu>
      <PanelActions
        refreshData={() => refreshIframe()}
        refreshTooltip="Reload iframe"
      />
    </Panel>
  );
};
