import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  FadeFromBlack,
  Button,
  PlanetsLoader,
} from 'src/components/base';
import { IconSphere } from '@tabler/icons-react';
import { useSettingsContext, useAutoRefresh } from 'src/hooks';
import { AuroraForecastSettings } from '../modals/UserSettings/panel-settings';

const wrapperCss = (width?: number, height?: number) => css`
  ${width &&
  height &&
  width >= 500 &&
  height >= 500 &&
  'padding-bottom: 500px !important;'}
`;

const iconOrientationCss = (showSouthernHemisphere: boolean) => css`
  svg {
    transition: transform 0.2s ease-in-out;
    transform: rotate(${showSouthernHemisphere ? 180 : 0}deg);
  }
`;

export const AuroraForecast: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const {
    settings: {
      panelConfigs: { AuroraForecast },
    },
  } = useSettingsContext();
  const getCurrentTimestamp = () => new Date().getTime();
  const northernHemisphere =
    'http://api.spacedashboard.com/img/aurora-forecast-northern-hemisphere.jpg';
  const southernHemisphere =
    'https://api.spacedashboard.com/img/aurora-forecast-southern-hemisphere.jpg';
  const [northernSrc, setNorthernSrc] = useState(
    `${northernHemisphere}?updated=${getCurrentTimestamp()}`,
  );
  const [southernSrc, setSouthernSrc] = useState(
    `${southernHemisphere}?updated=${getCurrentTimestamp()}`,
  );
  const [showSouthernHemisphere, setShowSouthernHemisphere] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState<number | undefined>(
    undefined,
  );
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(
    undefined,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  const refreshImages = () => {
    setIsLoading(true);
    setNorthernSrc(`${northernHemisphere}?updated=${getCurrentTimestamp()}`);
    setSouthernSrc(`${southernHemisphere}?updated=${getCurrentTimestamp()}`);
  };

  const { resetTimer } = useAutoRefresh(refreshImages, 60000 * 5);

  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!wrapperRef.current) return;
      setWrapperWidth(
        (wrapperRef.current.children[0] as HTMLElement).getBoundingClientRect()
          .width,
      );
      setWrapperHeight(
        (wrapperRef.current.children[0] as HTMLElement).getBoundingClientRect()
          .height,
      );
    }, 500);
  };

  useEffect(() => {
    if (wrapperRef.current) {
      window.addEventListener('resize', handleResize);
    }

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (AuroraForecast.startWithSouthernHemisphere) {
      setShowSouthernHemisphere(true);
    }
  }, [AuroraForecast.startWithSouthernHemisphere]);

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <PlanetsLoader showLoader={isLoading} />
          <div
            className={cx(
              'data-img-wrapper',
              wrapperCss(wrapperWidth, wrapperHeight),
            )}
            ref={wrapperRef}
          >
            {showSouthernHemisphere ? (
              <img
                src={southernSrc}
                alt="Aurora Forecast Southern Hemisphere"
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <img
                src={northernSrc}
                alt="Aurora Forecast Northern Hemisphere"
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        <p>
          {'Credit: '}
          <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noreferrer">
            {'Space Weather Prediction Center (SWPC)'}
          </a>
        </p>
        <p>
          {'From SWPC:'}
          <br />
          {
            'Space Weather impacts numerous facets of everyday life, from where airplanes can safely fly, to how accurately a farmer plows his field. In addition, there are a large variety of phenomena that are driven by the variability of the sun over periods ranging from hours to years. SWPC provides information for novices and experts alike about the impacts and phenomena of Space Weather'
          }
        </p>
        <AuroraForecastSettings />
      </PanelMenu>
      <PanelActions
        refreshData={() => {
          resetTimer();
          refreshImages();
        }}
        refreshTooltip="Reload image"
      >
        <Button
          onClick={() => {
            setIsLoading(true);
            setShowSouthernHemisphere(!showSouthernHemisphere);
          }}
          className={iconOrientationCss(showSouthernHemisphere)}
          tooltipTitle={
            showSouthernHemisphere
              ? 'Show Northern Hemisphere'
              : 'Show Southern Hemisphere'
          }
          Icon={IconSphere}
          isPanelAction={true}
          variantsList={['secondary']}
        />
      </PanelActions>
    </Panel>
  );
};
