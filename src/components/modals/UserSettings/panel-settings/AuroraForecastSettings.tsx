import React from 'react';
import { Toggle, TooltipWrapper } from 'src/components/base';
import { useSettingsContext } from 'src/hooks';
import { IconInfoCircle } from '@tabler/icons-react';

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
        label={
          <>
            {'Show southern hemisphere by default'}
            <TooltipWrapper
              title="When enabled, the aurora forecast for the southern hemisphere will be shown by default"
              delay={300}
            >
              <IconInfoCircle color="#CCC" size={20} />
            </TooltipWrapper>
          </>
        }
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
        label={
          <>
            {'Show video by default'}
            <TooltipWrapper
              title="When enabled, a video of the aurora forecast for the selected hemisphere will be shown on loop by default"
              delay={300}
            >
              <IconInfoCircle color="#CCC" size={20} />
            </TooltipWrapper>
          </>
        }
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
