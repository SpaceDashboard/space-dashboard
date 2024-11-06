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
import { IconVideo, IconVideoOff } from '@tabler/icons-react';
import { useAppContext, useSettingsContext, useAutoRefresh } from 'src/hooks';
import { SolarVisualSettings } from 'src/components/modals/UserSettings/panel-settings';
import { getCurrentTimestamp } from 'src/shared/utils';

// Consider making a wrapper component for `.data-img-wrapper`
const wrapperCss = (width?: number, height?: number) => css`
  ${width &&
  height &&
  width >= 500 &&
  height >= 500 &&
  'padding-bottom: 500px !important;'}
`;

export const SolarVisual: React.FC<PanelProps> = ({ index, componentKey }) => {
  const { navAnimationSeconds } = useAppContext();
  const {
    settings: {
      panelConfigs: { SolarVisual },
    },
  } = useSettingsContext();
  const coronaImage = 'https://api.spacedashboard.com/img/current-corona.jpg';
  const coronaVideo = 'https://api.spacedashboard.com/vid/current-corona.mp4';
  const [imageSrc, setImageSrc] = useState(
    `${coronaImage}?u=${getCurrentTimestamp()}`,
  );
  const [videoSrc, setVideoSrc] = useState(
    `${coronaVideo}?u=${getCurrentTimestamp()}`,
  );
  const [showVideo, setShowVideo] = useState(
    SolarVisual.startWithVideo ?? false,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState<number | undefined>(500);
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(500);
  const wrapperRef = useRef<HTMLDivElement>(null);
  let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  const refreshImageVideo = () => {
    setIsLoading(true);
    setImageSrc(`${coronaImage}?u=${getCurrentTimestamp()}`);
    setVideoSrc(`${coronaVideo}?u=${getCurrentTimestamp()}`);
  };

  const { resetTimer } = useAutoRefresh(refreshImageVideo, 60000 * 10); // 10 minutes

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

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
            <img
              src={imageSrc}
              key={imageSrc}
              alt="Current visual of the sun"
              loading="eager"
              onLoad={() => {
                setIsLoading(false);
                handleResize();
              }}
            />
          )}
        </div>
      </PanelBody>
      <PanelMenu>
        <p>
          {'Credit: '}
          <a href="https://sdo.gsfc.nasa.gov/" target="_blank" rel="noreferrer">
            {'Solar Dynamics Observatory'}
          </a>
        </p>
        <p>
          {'About this graphic/video from SDO:'}
          <br />
          {
            'This channel highlights the outer atmosphere of the Sun - called the corona - as well as hot flare plasma. Hot active regions, solar flares, and coronal mass ejections will appear bright here. The dark areas - called coronal holes - are places where very little radiation is emitted, yet are the main source of solar wind particles.'
          }
        </p>
        <SolarVisualSettings />
      </PanelMenu>
      <PanelActions
        refreshData={() => {
          resetTimer();
          refreshImageVideo();
        }}
        refreshTooltip={`Reload ${showVideo ? 'video' : 'image'}`}
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
      </PanelActions>
    </Panel>
  );
};
