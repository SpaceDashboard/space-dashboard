import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  Button,
  PlanetsLoader,
} from 'src/components/base';
import { IconSphere, IconVideo, IconVideoOff } from '@tabler/icons-react';
import { useAppContext, useSettingsContext, useAutoRefresh } from 'src/hooks';
import { AuroraForecastSettings } from 'src/components/modals/UserSettings/panel-settings';
import { getCurrentTimestamp } from 'src/shared/utils';

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
  const { navAnimationSeconds } = useAppContext();
  const {
    settings: {
      panelConfigs: { AuroraForecast },
    },
  } = useSettingsContext();
  const [showSouthernHemisphere, setShowSouthernHemisphere] = useState(
    AuroraForecast.startWithSouthernHemisphere ?? false,
  );
  const [showVideo, setShowVideo] = useState(
    AuroraForecast.startWithVideo ?? false,
  );
  const [isLoading, setIsLoading] = useState(false);
  const getHemisphereMedia = () => {
    const hemisphere = showSouthernHemisphere ? 'southern' : 'northern';
    return {
      img: `https://api.spacedashboard.com/img/aurora-forecast-${hemisphere}-hemisphere.webp`,
      vid: `https://api.spacedashboard.com/vid/${hemisphere}_hemisphere_forecast.mp4`,
    };
  };
  const [imageSrc, setImageSrc] = useState(`${getHemisphereMedia()['img']}`);
  const [videoSrc, setVideoSrc] = useState(`${getHemisphereMedia()['vid']}`);
  const [wrapperWidth, setWrapperWidth] = useState<number | undefined>(500);
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(500);
  const wrapperRef = useRef<HTMLDivElement>(null);
  let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  const refreshMedia = () => {
    setIsLoading(true);
    setImageSrc(`${getHemisphereMedia()['img']}?u=${getCurrentTimestamp()}`);
    setVideoSrc(`${getHemisphereMedia()['vid']}?u=${getCurrentTimestamp()}`);
  };

  const { resetTimer } = useAutoRefresh(refreshMedia, 60000 * 10); // 10 minutes

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

    setTimeout(
      () => {
        handleResize();
      },
      (navAnimationSeconds + 1) * 1000,
    );

    setInterval(() => {
      handleResize();
    }, 1000 * 5);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    refreshMedia();
  }, [showSouthernHemisphere]);

  return (
    <Panel index={index} componentKey={componentKey} minHeight={wrapperHeight}>
      <PanelBody>
        <PlanetsLoader showLoader={isLoading} />
        <div
          className={cx(
            'data-img-wrapper',
            wrapperCss(wrapperWidth, wrapperHeight),
          )}
          ref={wrapperRef}
        >
          {showVideo ? (
            <video
              muted
              autoPlay
              playsInline
              loop={true}
              key={videoSrc}
              onLoadedData={() => {
                setIsLoading(false);
                handleResize();
              }}
            >
              <source src={videoSrc} type="video/mp4"></source>
            </video>
          ) : (
            <picture>
              <source srcSet={`${imageSrc}`} type="image/webp" />
              <source
                srcSet={`${imageSrc.replace('.webp', '.jpg')}`}
                type="image/jpeg"
              />
              <img
                src={imageSrc}
                key={imageSrc}
                alt={`Aurora Forecast ${showSouthernHemisphere ? 'Southern Hemisphere' : 'Northern Hemisphere'}`}
                loading="eager"
                // React doesn't recognize `fetchPriority` console error fixed in React 19: https://github.com/facebook/react/issues/27233
                fetchPriority="high"
                onLoad={() => {
                  setIsLoading(false);
                  handleResize();
                }}
              />
            </picture>
          )}
        </div>
      </PanelBody>
      <PanelMenu>
        <h4>
          {showSouthernHemisphere
            ? 'Southern Hemisphere'
            : 'Northern Hemisphere'}
        </h4>
        <p>
          {'Credit: '}
          <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noreferrer">
            {'Space Weather Prediction Center (SWPC)'}
          </a>
        </p>
        <AuroraForecastSettings />
      </PanelMenu>
      <PanelActions
        refreshData={() => {
          resetTimer();
          refreshMedia();
        }}
        refreshTooltip="Reload image"
      >
        <Button
          ariaLabel={showVideo ? 'Switch to image' : 'Switch to video'}
          onClick={() => {
            setIsLoading(true);
            setShowVideo(!showVideo);
          }}
          tooltipTitle={showVideo ? 'Switch to image' : 'Switch to video'}
          Icon={showVideo ? IconVideoOff : IconVideo}
          isPanelAction={true}
          variantsList={['secondary']}
        />
        <Button
          ariaLabel={`Show ${showSouthernHemisphere ? 'Northern' : 'Southern'} Hemisphere`}
          onClick={() => {
            setIsLoading(true);
            setShowSouthernHemisphere(!showSouthernHemisphere);
          }}
          className={iconOrientationCss(showSouthernHemisphere)}
          tooltipTitle={`Show ${showSouthernHemisphere ? 'Northern' : 'Southern'} Hemisphere`}
          Icon={IconSphere}
          isPanelAction={true}
          variantsList={['secondary']}
        />
      </PanelActions>
    </Panel>
  );
};
