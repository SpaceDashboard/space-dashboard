import React from 'react';
import { Toggle } from 'src/components/base';
import { useSettingsContext } from 'src/hooks';

export const DeepSpaceNetworkSettings: React.FC = () => {
  const {
    settings: {
      panelConfigs: { DeepSpaceNetwork },
    },
    updatePanelConfigs,
  } = useSettingsContext();

  return (
    <Toggle
      label="Load Deep Space Network by default"
      tooltip="When enabled, the Deep Space Network iframe will render on page load by default"
      checked={DeepSpaceNetwork.renderDSNOnLoad}
      wrapperJustifyContent="center"
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
