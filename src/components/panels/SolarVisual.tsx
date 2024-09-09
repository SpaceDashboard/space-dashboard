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
import { IconVideo, IconVideoOff } from '@tabler/icons-react';
import { useSettingsContext } from 'src/hooks';
import { SolarVisualSettings } from '../modals/UserSettings/panel-settings';

const wrapperCss = (height?: number) => css`
  ${height && height > 500 && 'padding-bottom: 500px !important;'}
`;

export const SolarVisual: React.FC<PanelProps> = ({ index, componentKey }) => {
  const {
    settings: {
      panelConfigs: { SolarVisual },
    },
  } = useSettingsContext();
  const [showVideo, setShowVideo] = React.useState(false);
  const [wrapperHeight, setWrapperHeight] = React.useState<number | undefined>(
    undefined,
  );
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

  useEffect(() => {
    if (SolarVisual.startWithVideo) {
      setShowVideo(true);
    }
  }, [SolarVisual.startWithVideo]);

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
            {showVideo ? (
              <video autoPlay loop={true}>
                <source
                  src="https://api.spacedashboard.com/vid/current-corona.mp4"
                  type="video/mp4"
                ></source>
              </video>
            ) : (
              <img
                src="https://api.spacedashboard.com/img/current-corona.jpg"
                alt="Current visual of the sun"
              />
            )}
          </div>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        <SolarVisualSettings />
      </PanelMenu>
      <PanelActions refreshData={() => console.log('TODO: Refresh clicked')}>
        <Button
          onClick={() => setShowVideo(!showVideo)}
          tooltipTitle={showVideo ? 'Switch to image' : 'Switch to video'}
          Icon={showVideo ? IconVideoOff : IconVideo}
          isPanelAction={true}
          variantsList={['secondary']}
        />
      </PanelActions>
    </Panel>
  );
};
