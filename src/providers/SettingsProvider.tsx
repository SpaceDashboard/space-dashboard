import React, { createContext } from 'react';
import { useLocalStorage } from 'src/hooks';

interface Settings {
  columnOneOrder: string[];
  columnTwoOrder: string[];
  columnThreeOrder: string[];
  reduceMotion: boolean;
  reduceButtonAnimation: boolean;
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
  columnOneOrder: ['IssFeed1', 'IssFeed2'],
  columnTwoOrder: ['IssTracker', 'SolarVisual'],
  columnThreeOrder: ['AuroraForecast', 'AuroraForecast'],
  reduceMotion: false,
  reduceButtonAnimation: false,
  animationSpeedAdjustment: 1,
  issLiveViewAutoPlay: false,
  issLiveViewMute: true,
  issLiveHDViewsAutoPlay: false,
  issLiveHDViewsMute: true,
};

export const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined,
);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings: () => setSettings(defaultSettings),
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};