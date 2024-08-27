import React, { createContext, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/hooks';

interface AppProviderProps {
  navAnimationSeconds: number;
  allPanelsLoaded: boolean;
  isAboutOpen?: boolean;
  setIsAboutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isContactFormOpen?: boolean;
  setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUserSettingsOpen?: boolean;
  setIsUserSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  issLiveFeedVideoId1?: string;
  issLiveFeedVideoId2?: string;
}

export const AppContext = createContext<AppProviderProps>({
  navAnimationSeconds: 0,
  allPanelsLoaded: false,
  setIsAboutOpen: () => {},
  setIsContactFormOpen: () => {},
  setIsUserSettingsOpen: () => {},
});

const AppProvider = ({ children }: React.PropsWithChildren) => {
  const {
    settings: { animationSpeedAdjustment },
  } = useSettingsContext();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [allPanelsLoaded, setAllPanelsLoaded] = useState(false);

  // Close to the nav animation time, but not exact. This felt right though.
  const navAnimationSeconds = useMemo(
    () => 1.75 * animationSpeedAdjustment,
    [animationSpeedAdjustment],
  );

  // After 8 seconds consider all panels loaded - easier than actually calculating it
  setTimeout(() => {
    if (!allPanelsLoaded) {
      setAllPanelsLoaded(true);
    }
  }, 8000);

  const value = useMemo(
    () => ({
      navAnimationSeconds,
      allPanelsLoaded,
      isAboutOpen,
      setIsAboutOpen,
      isContactFormOpen,
      setIsContactFormOpen,
      isUserSettingsOpen,
      setIsUserSettingsOpen,
      issLiveFeedVideoId1: '6g1IMx-iIRY',
      issLiveFeedVideoId2: 'NlBLeMiRKT4',
    }),
    [
      navAnimationSeconds,
      allPanelsLoaded,
      isAboutOpen,
      setIsAboutOpen,
      isContactFormOpen,
      setIsContactFormOpen,
      isUserSettingsOpen,
      setIsUserSettingsOpen,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
