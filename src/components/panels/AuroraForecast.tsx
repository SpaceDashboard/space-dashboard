import React, { useEffect, useRef, useState } from 'react';
import { css, cx } from '@emotion/css';
import {
  Panel,
  PanelBody,
  PanelActions,
  PanelProps,
  PanelMenu,
  FadeFromBlack,
} from 'src/components/base';

const wrapperCss = (width?: number, height?: number) => css`
  ${width &&
  height &&
  width >= 500 &&
  height >= 500 &&
  'padding-bottom: 500px !important;'}
`;

export const AuroraForecast: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const [wrapperWidth, setWrapperWidth] = useState<number | undefined>(
    undefined,
  );
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(
    undefined,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);
  let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

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
            <img
              src="http://api.spacedashboard.com/img/aurora-forecast-northern-hemisphere.jpg"
              style={{ width: '100%', maxWidth: '500px' }}
              alt="test"
            />
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
      </PanelMenu>
      <PanelActions
        refreshData={() => console.log('TODO: Refresh clicked')}
      ></PanelActions>
    </Panel>
  );
};
