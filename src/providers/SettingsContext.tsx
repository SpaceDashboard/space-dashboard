import { createContext } from 'react';
import { AvailablePanels, PanelConfig } from 'src/shared/PanelConfigs';
import { Settings } from 'src/providers';

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
