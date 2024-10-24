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
  Button,
} from 'src/components/base';
import { useAppContext, useSettingsContext } from 'src/hooks';
import { DeepSpaceNetworkSettings } from 'src/components/modals/UserSettings/panel-settings';
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
  const {
    settings: {
      panelConfigs: { DeepSpaceNetwork },
    },
  } = useSettingsContext();
  const dsnSource = 'https://eyes.nasa.gov/dsn/dsn.html';
  const [showDSNIframe, setShowDSNIframe] = useState(
    DeepSpaceNetwork.renderDSNOnLoad ?? false,
  );
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

  useEffect(() => {
    setShowDSNIframe(DeepSpaceNetwork.renderDSNOnLoad ?? false);
  }, [DeepSpaceNetwork.renderDSNOnLoad]);

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <PlanetsLoader showLoader={isLoading} />
        {showDSNIframe ? (
          <iframe
            className={cx('aspect-16-9', iframeCss)}
            src={iframeSrc}
            onLoad={() => setIsLoading(false)}
            tabIndex={-1}
          ></iframe>
        ) : (
          <FlexWrapper
            alignItems="center"
            gap={20}
            justifyContent="center"
            style={{ padding: '100px 0' }}
          >
            <p>
              {
                'For performance reasons, the Deep Space Network iframe is not loaded by default.'
              }
            </p>
            <DeepSpaceNetworkSettings />
            <Button
              variantsList={['secondary']}
              onClick={() => setShowDSNIframe(true)}
            >
              {'Load Deep Space Network'}
            </Button>
          </FlexWrapper>
        )}
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
          <DeepSpaceNetworkSettings />
        </FlexWrapper>
      </PanelMenu>
      <PanelActions
        isRefreshEnabled={showDSNIframe}
        refreshData={() => refreshIframe()}
        refreshTooltip="Reload iframe"
      />
    </Panel>
  );
};
