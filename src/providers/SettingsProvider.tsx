import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from 'src/hooks';
import {
  defaultColumn1Order,
  defaultColumn2Order,
  defaultColumn3Order,
} from 'src/shared/ColumnPanelConfig';

interface Settings {
  column1Order: string[];
  column2Order: string[];
  column3Order: string[];
  reduceMotion: boolean;
  reduceTransparency: boolean;
  reduceButtonAnimation: boolean;
  enableButtonAnimationAlways: boolean;
  animationSpeedAdjustment: number;
  issLiveViewAutoPlay: boolean;
  issLiveViewMute: boolean;
  issLiveHDViewsAutoPlay: boolean;
  issLiveHDViewsMute: boolean;
}

export interface SettingsContextProps {
  settings: Settings;
  defaultSettings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
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
    reduceMotion: false,
    reduceTransparency: false,
    reduceButtonAnimation: false,
    enableButtonAnimationAlways: false,
    animationSpeedAdjustment: 1,
    issLiveViewAutoPlay: false,
    issLiveViewMute: true,
    issLiveHDViewsAutoPlay: false,
    issLiveHDViewsMute: true,
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

  const value = useMemo(
    () => ({
      settings,
      defaultSettings,
      updateSettings,
      resetSettings: () => setSettings(defaultSettings),
    }),
    [settings, updateSettings, setSettings, defaultSettings],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsProvider;
