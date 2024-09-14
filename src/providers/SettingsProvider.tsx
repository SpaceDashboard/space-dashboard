import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from 'src/hooks';
import {
  defaultColumn1Order,
  defaultColumn2Order,
  defaultColumn3Order,
  AvailablePanels,
  MoveablePanels,
  PanelConfig,
  defaultPanelConfigs,
} from 'src/shared/PanelConfigs';

interface Settings {
  column1Order: MoveablePanels[];
  column2Order: MoveablePanels[];
  column3Order: MoveablePanels[];
  panelConfigs: { [key in AvailablePanels]: PanelConfig };
  reduceMotion: boolean;
  reduceTransparency: boolean;
  reduceButtonAnimation: boolean;
  enableButtonAnimationAlways: boolean;
  animationSpeedAdjustment: number;
  disableButtonTooltips: boolean;
}

export interface SettingsContextProps {
  settings: Settings;
  defaultSettings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  updatePanelConfigs: (
    newPanelConfigs: Partial<Record<AvailablePanels, PanelConfig>>,
  ) => void;
  resetSettings: () => void;
}

export const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const defaultSettings: Settings = {
    column1Order: defaultColumn1Order,
    column2Order: defaultColumn2Order,
    column3Order: defaultColumn3Order,
    panelConfigs: defaultPanelConfigs,
    reduceMotion: false,
    reduceTransparency: false,
    reduceButtonAnimation: false,
    enableButtonAnimationAlways: false,
    animationSpeedAdjustment: 1,
    disableButtonTooltips: false,
  };

  const [settings, setSettings] = useLocalStorage<Settings>(
    'SpaceDashboard-settings',
    defaultSettings,
  );

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings({
      ...settings,
      ...newSettings,
    });
  };

  const updatePanelConfigs = (
    newPanelConfigs: Partial<Record<AvailablePanels, PanelConfig>>,
  ) => {
    updateSettings({
      panelConfigs: { ...settings.panelConfigs, ...newPanelConfigs },
    });
  };

  const value = useMemo(
    () => ({
      settings,
      defaultSettings,
      updateSettings,
      updatePanelConfigs,
      resetSettings: () => setSettings(defaultSettings),
    }),
    [
      settings,
      updateSettings,
      updatePanelConfigs,
      setSettings,
      defaultSettings,
    ],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
