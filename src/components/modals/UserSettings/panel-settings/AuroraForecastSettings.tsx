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
            {'Start with southern hemisphere'}
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
    </>
  );
};
