import React, { useEffect, useRef, useState } from 'react';
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
import { IconVideo, IconVideoOff } from '@tabler/icons-react';
import { useSettingsContext } from 'src/hooks';
import { SolarVisualSettings } from '../modals/UserSettings/panel-settings';

// TODO: consider making a wrapper component for `.data-img-wrapper`
const wrapperCss = (width?: number, height?: number) => css`
  ${width &&
  height &&
  width >= 500 &&
  height >= 500 &&
  'padding-bottom: 500px !important;'}
`;

export const SolarVisual: React.FC<PanelProps> = ({ index, componentKey }) => {
  const {
    settings: {
      panelConfigs: { SolarVisual },
    },
  } = useSettingsContext();
  const getCurrentTimestamp = () => new Date().getTime();
  const coronaImage = 'https://api.spacedashboard.com/img/current-corona.jpg';
  const coronaVideo = 'https://api.spacedashboard.com/vid/current-corona.mp4';
  const [imageSrc, setImageSrc] = useState(
    `${coronaImage}?updated=${getCurrentTimestamp()}`,
  );
  const [videoSrc, setVideoSrc] = useState(
    `${coronaVideo}?updated=${getCurrentTimestamp()}`,
  );
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState<number | undefined>(
    undefined,
  );
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(
    undefined,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  const refreshImageVideo = () => {
    setImageSrc(`${coronaImage}?updated=${getCurrentTimestamp()}`);
    setVideoSrc(`${coronaVideo}?updated=${getCurrentTimestamp()}`);
  };

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
    if (SolarVisual.startWithVideo) {
      setShowVideo(true);
    }
  }, [SolarVisual.startWithVideo]);

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <div
            className={cx(
              'data-img-wrapper',
              wrapperCss(wrapperWidth, wrapperHeight),
            )}
            ref={wrapperRef}
          >
            {/* TODO: POC, now do loading graphic */}
            {isLoading ? <p>Loading...</p> : null}

            {showVideo ? (
              <video
                autoPlay
                loop={true}
                onLoadedData={() => setIsLoading(false)}
              >
                <source src={videoSrc} type="video/mp4"></source>
              </video>
            ) : (
              <img
                src={imageSrc}
                alt="Current visual of the sun"
                onLoadedData={() => setIsLoading(false)}
                onLoad={() => setIsLoading(false)}
              />
            )}
          </div>
        </FadeFromBlack>
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
      <PanelActions refreshData={refreshImageVideo}>
        <Button
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
