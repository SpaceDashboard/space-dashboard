import React, { useEffect, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/hooks';
import { AppContext } from 'src/providers';

const AppProvider = ({ children }: React.PropsWithChildren) => {
  const {
    settings: {
      animationSpeedAdjustment,
      enableLoadingAnimation,
      panelConfigs,
    },
  } = useSettingsContext();
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isUserSettingsOpen, setIsUserSettingsOpen] = useState(false);
  const [allPanelsLoaded, setAllPanelsLoaded] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [issLiveFeedVideoId1, setIssLiveFeedVideoId1] = useState<string>(
    panelConfigs.IssFeed1.videoIdOverride || '',
  );
  const [issLiveFeedVideoId2, setIssLiveFeedVideoId2] = useState<string>(
    panelConfigs.IssFeed2.videoIdOverride || '',
  );
  const [issLiveFeedVideoId3, setIssLiveFeedVideoId3] = useState<string>(
    panelConfigs.IssFeed3.videoIdOverride || '',
  );

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
      issLiveFeedVideoId1,
      issLiveFeedVideoId2,
      issLiveFeedVideoId3,
      setIssLiveFeedVideoId1,
      setIssLiveFeedVideoId2,
      setIssLiveFeedVideoId3,
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
      issLiveFeedVideoId1,
      issLiveFeedVideoId2,
      issLiveFeedVideoId3,
      setIssLiveFeedVideoId1,
      setIssLiveFeedVideoId2,
      setIssLiveFeedVideoId3,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
