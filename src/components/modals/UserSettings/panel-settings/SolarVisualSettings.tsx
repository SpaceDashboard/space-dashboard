import React from 'react';
import { Toggle, TooltipWrapper } from 'src/components/base';
import { useSettingsContext } from 'src/hooks';
import { IconInfoCircle } from '@tabler/icons-react';

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
        label={
          <>
            {'Show video by default'}
            <TooltipWrapper
              title="When enabled, a video of the last 48 hours of solar activity on loop will be shown by default"
              delay={300}
            >
              <IconInfoCircle color="#CCC" size={20} />
            </TooltipWrapper>
          </>
        }
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
