import React, { createContext, useState } from 'react';

interface AppProviderProps {
  navAnimationDurationSeconds: number;
  reduceMotion: boolean;
  setReduceMotion: React.Dispatch<React.SetStateAction<boolean>>;
  issLiveViewAutoPlay?: boolean;
  setIssLiveViewAutoPlay?: React.Dispatch<React.SetStateAction<boolean>>;
  issLiveViewMute?: boolean;
  setIssLiveViewMute?: React.Dispatch<React.SetStateAction<boolean>>;
  issLiveHDViewsAutoPlay?: boolean;
  setIssLiveHDViewsAutoPlay?: React.Dispatch<React.SetStateAction<boolean>>;
  issLiveHDViewsMute?: boolean;
  setIssLiveHDViewsMute?: React.Dispatch<React.SetStateAction<boolean>>;
  isContactFormOpen?: boolean;
  setIsContactFormOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppProviderProps>({
  navAnimationDurationSeconds: 0,
  reduceMotion: false,
  setReduceMotion: () => {},
});

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const navAnimationDurationSeconds = 1.55;
  const [reduceMotion, setReduceMotion] = useState(false);
  const [issLiveViewAutoPlay, setIssLiveViewAutoPlay] = useState(false);
  const [issLiveViewMute, setIssLiveViewMute] = useState(false);
  const [issLiveHDViewsAutoPlay, setIssLiveHDViewsAutoPlay] = useState(false);
  const [issLiveHDViewsMute, setIssLiveHDViewsMute] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        navAnimationDurationSeconds,
        reduceMotion,
        setReduceMotion,
        issLiveViewAutoPlay,
        setIssLiveViewAutoPlay,
        issLiveViewMute,
        setIssLiveViewMute,
        issLiveHDViewsAutoPlay,
        setIssLiveHDViewsAutoPlay,
        issLiveHDViewsMute,
        setIssLiveHDViewsMute,
        isContactFormOpen,
        setIsContactFormOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
