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

const issTrackerWrapperCss = (iframeScaledHeight?: number) => css`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  max-height: ${iframeScaledHeight ? `${iframeScaledHeight}px` : '100%'};
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

export const IssTracker: React.FC<PanelProps> = ({ index }) => {
  const issTrackerWrapperRef = useRef<HTMLDivElement | null>(null);
  const issTrackerFrameRef = useRef<HTMLIFrameElement | null>(null);
  const [issTrackerFrameScale, setIssTrackerFrameScale] = useState<number>(1);
  const [issTrackerScaleHeight, setIssTrackerScaleHeight] = useState<
    number | undefined
  >();
  let resizeIssFrameTimeout: ReturnType<typeof setTimeout> | undefined;

  const handleResize = () => {
    if (!issTrackerFrameRef.current || !issTrackerWrapperRef.current) return;
    const issTrackerWrapper = issTrackerWrapperRef.current;
    const issTrackerFrame = issTrackerFrameRef.current;
    const scaleForWidth =
      issTrackerWrapper.clientWidth / issTrackerFrame.clientWidth;
    const scaleForHeight =
      issTrackerWrapper.clientHeight / issTrackerFrame.clientHeight;

    clearTimeout(resizeIssFrameTimeout);
    resizeIssFrameTimeout = setTimeout(() => {
      let scale = scaleForWidth;

      if (
        issTrackerFrame.clientHeight * scaleForWidth -
          issTrackerWrapper.clientHeight >=
        0
      ) {
        scale = scaleForHeight;
      }

      setIssTrackerFrameScale(scale);
      setIssTrackerScaleHeight(issTrackerFrame.clientHeight * scale);
    }, 500);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [issTrackerWrapperRef.current]);

  return (
    <Panel index={index}>
      <PanelBody>
        <FadeFromBlack>
          <div
            className={issTrackerWrapperCss(issTrackerScaleHeight)}
            ref={issTrackerWrapperRef}
          >
            <iframe
              className={issTrackerFrameCss(issTrackerFrameScale)}
              ref={issTrackerFrameRef}
              src="https://isstracker.spaceflight.esa.int/"
              scrolling="no" // Deprecated but works better than overflow: hidden
            ></iframe>
          </div>
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
