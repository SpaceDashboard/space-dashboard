import React from 'react';
import { Toggle, TooltipWrapper } from 'src/components/base';
import { useSettingsContext } from 'src/hooks';
import { IconInfoCircle } from '@tabler/icons-react';

export const DeepSpaceNetworkSettings: React.FC = () => {
  const {
    settings: {
      panelConfigs: { DeepSpaceNetwork },
    },
    updatePanelConfigs,
  } = useSettingsContext();

  return (
    <Toggle
      label={
        <>
          {'Load Deep Space Network by default'}
          <TooltipWrapper
            title="When enabled, the Deep Space Network iframe will render on page load by default"
            delay={300}
          >
            <IconInfoCircle color="#CCC" size={20} />
          </TooltipWrapper>
        </>
      }
      checked={DeepSpaceNetwork.renderDSNOnLoad}
      onChange={() =>
        updatePanelConfigs({
          DeepSpaceNetwork: {
            ...DeepSpaceNetwork,
            renderDSNOnLoad: !DeepSpaceNetwork.renderDSNOnLoad,
          },
        })
      }
    />
  );
};
