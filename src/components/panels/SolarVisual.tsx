import React, { useEffect } from 'react';
import { css } from '@emotion/css';
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

const solarVisualWrapperCss = css`
  height: 500px;
`;

export const SolarVisual: React.FC<PanelProps> = ({ index, componentKey }) => {
  const {
    settings: {
      panelConfigs: { SolarVisual },
    },
  } = useSettingsContext();
  const [showVideo, setShowVideo] = React.useState(false);

  useEffect(() => {
    if (SolarVisual.startWithVideo) {
      setShowVideo(true);
    }
  }, [SolarVisual.startWithVideo]);

  return (
    <Panel index={index} componentKey={componentKey}>
      <PanelBody>
        <FadeFromBlack>
          <div className={solarVisualWrapperCss}>
            {showVideo ? (
              <video
                autoPlay
                loop={true}
                style={{ width: '100%', maxWidth: '500px' }}
              >
                <source
                  src="https://api.spacedashboard.com/vid/current-corona.mp4"
                  type="video/mp4"
                ></source>
              </video>
            ) : (
              <img
                src="https://api.spacedashboard.com/img/current-corona.jpg"
                style={{ width: '100%', maxWidth: '500px' }}
                alt="Current visual of the sun"
              />
            )}
          </div>
        </FadeFromBlack>
      </PanelBody>
      <PanelMenu>
        <SolarVisualSettings />
      </PanelMenu>
      <PanelActions refreshData={() => console.log('Refresh clicked')}>
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
