import React, { createContext, useMemo } from 'react';
import { useLocalStorage } from 'src/hooks';

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
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  column1Order: ['IssFeed1', 'IssFeed2'],
  column2Order: ['IssTracker', 'SolarVisual'],
  column3Order: ['AuroraForecast'],
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

export const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
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
