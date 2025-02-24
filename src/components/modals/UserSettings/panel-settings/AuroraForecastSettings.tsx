import React from 'react';
import { Toggle } from 'src/components/base';
import { useSettingsContext } from 'src/hooks';

export const AuroraForecastSettings: React.FC = () => {
  const {
    settings: {
      panelConfigs: { AuroraForecast },
    },
    updatePanelConfigs,
  } = useSettingsContext();

  return (
    <>
      <Toggle
        label="Show southern hemisphere by default"
        tooltip="When enabled, the aurora forecast for the southern hemisphere will be shown by default"
        checked={AuroraForecast.startWithSouthernHemisphere}
        onChange={() =>
          updatePanelConfigs({
            AuroraForecast: {
              ...AuroraForecast,
              startWithSouthernHemisphere:
                !AuroraForecast.startWithSouthernHemisphere,
            },
          })
        }
      />
      <Toggle
        label="Show video by default"
        tooltip="When enabled, a video of the aurora forecast for the selected hemisphere will be shown on loop by default"
        checked={AuroraForecast.startWithVideo}
        onChange={() =>
          updatePanelConfigs({
            AuroraForecast: {
              ...AuroraForecast,
              startWithVideo: !AuroraForecast.startWithVideo,
            },
          })
        }
      />
    </>
  );
};
