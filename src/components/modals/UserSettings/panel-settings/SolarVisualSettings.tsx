import React from 'react';
import { Toggle } from 'src/components/base';
import { useSettingsContext } from 'src/hooks';

export const SolarVisualSettings: React.FC = () => {
  const {
    settings: {
      panelConfigs: { SolarVisual },
    },
    updatePanelConfigs,
  } = useSettingsContext();

  return (
    <Toggle
      label="Show video by default"
      tooltip="When enabled, a video of the last 48 hours of solar activity on loop will be shown by default"
      checked={SolarVisual.startWithVideo}
      onChange={() =>
        updatePanelConfigs({
          SolarVisual: {
            ...SolarVisual,
            startWithVideo: !SolarVisual.startWithVideo,
          },
        })
      }
    />
  );
};
