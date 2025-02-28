import React, { useEffect, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/hooks';
import { AppContext } from 'src/providers';

const AppProvider = ({ children }: React.PropsWithChildren) => {
  const {
    settings: { animationSpeedAdjustment, enableLoadingAnimation },
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
    if (!enableLoadingAnimation) {
      return 0.001; // bug where 0 causes an issue with FadeFromBlack component
    }

    if (viewportWidth < 540) {
      return 0.2;
    }

    return 0.8 * animationSpeedAdjustment;
  }, [viewportWidth, animationSpeedAdjustment]);

  // After 3 seconds consider all panels loaded - easier than actually calculating it
  setTimeout(
    () => {
      if (!allPanelsLoaded) {
        setAllPanelsLoaded(true);
      }
    },
    enableLoadingAnimation ? 3000 : 0,
  );

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
      issLiveFeedVideoId1: 'fO9e9jnhYK8',
      issLiveFeedVideoId2: 'jKHvbJe9c_Y',
      issLiveFeedVideoId3: 'H999s0P1Er0',
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
