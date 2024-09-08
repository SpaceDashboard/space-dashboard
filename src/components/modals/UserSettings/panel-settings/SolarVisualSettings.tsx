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
    <>
      <Toggle
        label="Show video by default"
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
    </>
  );
};
