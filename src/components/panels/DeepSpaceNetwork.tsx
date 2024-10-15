import React, { useEffect, useState } from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  PlanetsLoader,
  FlexWrapper,
} from 'src/components/base';
import { useAppContext } from 'src/hooks';
import { getCurrentTimestamp } from 'src/shared/utils';

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
        <PlanetsLoader showLoader={isLoading} />
        <iframe
          className={cx('aspect-16-9', iframeCss)}
          src={iframeSrc}
          onLoad={() => setIsLoading(false)}
          tabIndex={-1}
        ></iframe>
      </PanelBody>
      <PanelMenu>
        <FlexWrapper gap={12}>
          <div>
            <p>{'Credit: '}</p>
            <p>
              <a
                href="https://eyes.nasa.gov/dsn/"
                target="_blank"
                rel="noreferrer"
              >
                {'NASA JPL - Deep Space Network Now'}
              </a>
            </p>
          </div>
          <p>
            {
              "The Deep Space Network is NASA's international array of giant radio antennas that supports interplanetary spacecraft missions and provides radar and radio astronomy observations. The DSN consists of three facilities strategically placed around the world, enabling continuous communication with spacecraft as Earth rotates. The network's largest antennas, 230 feet in diameter, are capable of tracking spacecraft traveling tens of billions of miles from Earth."
            }
          </p>
          <p>
            <a
              href="https://www.nasa.gov/directorates/somd/space-communications-navigation-program/what-is-the-deep-space-network/"
              target="_blank"
              rel="noreferrer"
            >
              {'More about the Deep Space Network'}
            </a>
          </p>
        </FlexWrapper>
      </PanelMenu>
      <PanelActions
        refreshData={() => refreshIframe()}
        refreshTooltip="Reload iframe"
      />
    </Panel>
  );
};
