import React, { useEffect, useRef, useState } from 'react';
import { css } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  FadeFromBlack,
  PlanetsLoader,
} from 'src/components/base';

const issTrackerWrapperCss = css`
  align-items: center;
  aspect-ratio: 16 / 9;
  display: flex;
  height: auto;
  justify-content: center;
  min-height: 200px;
  position: relative;
  width: 100%;
`;

const issTrackerFrameCss = (issTrackerFrameScale: number) => css`
  max-height: 352px !important;
  min-height: 352px !important;
  max-width: 625px !important;
  min-width: 625px !important;
  transform: scale(${issTrackerFrameScale});
`;

export const IssTracker: React.FC<PanelProps> = ({ index, componentKey }) => {
  const issTrackerWrapperRef = useRef<HTMLDivElement | null>(null);
  const issTrackerFrameRef = useRef<HTMLIFrameElement | null>(null);
  const [issTrackerFrameScale, setIssTrackerFrameScale] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  let resizeIssFrameTimeout: ReturnType<typeof setTimeout> | undefined;
  const getCurrentTimestamp = () => new Date().getTime();
  const iframeBase = 'https://isstracker.spaceflight.esa.int/';
  const [iframeSrc, setIframeSrc] = useState(`
    ${iframeBase}?u=${getCurrentTimestamp()}
  `);

  const refreshIframe = () => {
    setIsLoading(true);
    setIframeSrc(`${iframeBase}?u=${getCurrentTimestamp()}`);
  };

  const handleResize = () => {
    clearTimeout(resizeIssFrameTimeout);
    resizeIssFrameTimeout = setTimeout(() => {
      if (!issTrackerFrameRef.current || !issTrackerWrapperRef.current) return;
      const issTrackerWrapper = issTrackerWrapperRef.current;
      const issTrackerFrame = issTrackerFrameRef.current;
      const scaleForWidth =
        issTrackerWrapper.clientWidth / issTrackerFrame.clientWidth;
      const scaleForHeight =
        issTrackerWrapper.clientHeight / issTrackerFrame.clientHeight;
      let scale = scaleForWidth;

      if (
        issTrackerFrame.clientHeight * scaleForWidth -
          issTrackerWrapper.clientHeight >=
        0
      ) {
        scale = scaleForHeight;
      }

      setIssTrackerFrameScale(scale);
    }, 500);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [issTrackerWrapperRef.current]);

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <div className={issTrackerWrapperCss} ref={issTrackerWrapperRef}>
          <FadeFromBlack>
            <PlanetsLoader showLoader={isLoading} />
            <iframe
              className={issTrackerFrameCss(issTrackerFrameScale)}
              ref={issTrackerFrameRef}
              src={iframeSrc}
              onLoad={() => setIsLoading(false)}
              scrolling="no" // Deprecated but works better than overflow: hidden
              tabIndex={-1}
            ></iframe>
          </FadeFromBlack>
        </div>
      </PanelBody>
      <PanelMenu>
        <p>
          {'Credit: '}
          <a
            href="https://www.esa.int/Science_Exploration/Human_and_Robotic_Exploration/International_Space_Station/Where_is_the_International_Space_Station"
            target="_blank"
            rel="noreferrer"
          >
            {'ESA: Where is the International Space Station'}
          </a>
        </p>
        <p>
          {'From ESA about this tracker:'}
          <br />
          {
            "Developed by ESA, [this tracker] shows where the Space Station is right now and its path 90 minutes ago and 90 minutes ahead. Due to the Station's orbit it appears to travel from west to east over our planet, and due to Earth's own rotation the Space Station's moves 2200 km to the west on each orbit."
          }
        </p>
      </PanelMenu>
      <PanelActions
        refreshData={() => refreshIframe()}
        refreshTooltip="Reload iframe"
      />
    </Panel>
  );
};
