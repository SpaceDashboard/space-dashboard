import React, { useEffect, useRef, useState } from 'react';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  Button,
  FadeFromBlack,
} from 'src/components/base';
import { css } from '@emotion/css';

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
  let resizeIssFrameTimeout: ReturnType<typeof setTimeout> | undefined;

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
            <iframe
              className={issTrackerFrameCss(issTrackerFrameScale)}
              ref={issTrackerFrameRef}
              src="https://isstracker.spaceflight.esa.int/"
              scrolling="no" // Deprecated but works better than overflow: hidden
            ></iframe>
          </FadeFromBlack>
        </div>
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
