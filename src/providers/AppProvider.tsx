import React, { createContext, useEffect, useMemo, useState } from 'react';
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
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navAnimationSeconds = useMemo(() => {
    if (viewportWidth < 540) {
      return 0.2;
    }
    return 0.8 * animationSpeedAdjustment;
  }, [viewportWidth, animationSpeedAdjustment]);

  // After 3 seconds consider all panels loaded - easier than actually calculating it
  setTimeout(() => {
    if (!allPanelsLoaded) {
      setAllPanelsLoaded(true);
    }
  }, 3000);

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
      issLiveFeedVideoId1: 'DfEr5XCFNWM',
      issLiveFeedVideoId2: 'O9mYwRlucZY',
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
