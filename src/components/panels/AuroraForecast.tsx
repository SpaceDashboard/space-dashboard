import React, { useEffect } from 'react';
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

const wrapperCss = (height?: number) => css`
  ${height && height > 500 && 'padding-bottom: 500px !important;'}
`;

export const AuroraForecast: React.FC<PanelProps> = ({
  index,
  componentKey,
}) => {
  const [wrapperHeight, setWrapperHeight] = React.useState<number | undefined>(
    undefined,
  );
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!wrapperRef.current) return;
      setWrapperHeight(wrapperRef.current.offsetHeight);
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
            className={cx('data-img-wrapper', wrapperCss(wrapperHeight))}
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
        {'This is a test'}
        <Button variantsList={['small']}>Button</Button>
      </PanelMenu>
      <PanelActions
        refreshData={() => console.log('TODO: Refresh clicked')}
      ></PanelActions>
    </Panel>
  );
};
