import React, { createContext, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/hooks';

interface AppProviderProps {
  navAnimationSeconds: number;
  isAboutOpen?: boolean;
  setIsAboutOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isContactFormOpen?: boolean;
  setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUserSettingsOpen?: boolean;
  setIsUserSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppProviderProps>({
  navAnimationSeconds: 0,
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

  // Close to the nav animation time, but not exact. This felt right though.
  const navAnimationSeconds = useMemo(
    () => 1.75 * animationSpeedAdjustment,
    [animationSpeedAdjustment],
  );

  const value = useMemo(
    () => ({
      navAnimationSeconds,
      isAboutOpen,
      setIsAboutOpen,
      isContactFormOpen,
      setIsContactFormOpen,
      isUserSettingsOpen,
      setIsUserSettingsOpen,
    }),
    [
      navAnimationSeconds,
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