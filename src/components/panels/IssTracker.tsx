import React, { useEffect, useRef, useState } from 'react';
import {
  Panel,
  PanelBody,
  PanelProps,
  FadeFromBlack,
} from 'src/components/base';
import { css } from '@emotion/css';

const issTrackerWrapperCss = css`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: scroll;
  position: relative;
  width: 100%;
`;

const issTrackerFrameCss = (issTrackerFrameScale: number) => css`
  border: none;
  max-height: 352px !important;
  min-height: 352px !important;
  max-width: 625px !important;
  min-width: 625px !important;
  transform: scale(${issTrackerFrameScale});
  transition: 0.5s transform ease;
`;

export const IssTracker: React.FC<PanelProps> = ({ ...props }) => {
  const issTrackerWrapperRef = useRef<HTMLDivElement | null>(null);
  const issTrackerFrameRef = useRef<HTMLIFrameElement | null>(null);
  const [issTrackerFrameScale, setIssTrackerFrameScale] = useState(1);
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
    <Panel {...props}>
      <PanelBody>
        <FadeFromBlack>
          <div className={issTrackerWrapperCss} ref={issTrackerWrapperRef}>
            <iframe
              className={issTrackerFrameCss(issTrackerFrameScale)}
              ref={issTrackerFrameRef}
              src="https://isstracker.spaceflight.esa.int/"
              marginWidth={0}
              marginHeight={0}
              frameBorder={0}
              scrolling="no"
            ></iframe>
          </div>
        </FadeFromBlack>
      </PanelBody>
    </Panel>
  );
};
