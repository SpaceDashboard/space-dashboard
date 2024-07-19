import React, { createContext, useMemo, useState } from 'react';
import { useSettingsContext } from 'src/hooks';

interface AppProviderProps {
  navAnimationSeconds: number;
  isContactFormOpen?: boolean;
  setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppProviderProps>({
  navAnimationSeconds: 0,
  setIsContactFormOpen: () => {},
});

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const {
    settings: { animationSpeedAdjustment },
  } = useSettingsContext();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  // Close to the nav animation time, but not exact. This felt right though.
  const navAnimationSeconds = useMemo(
    () => 1.75 * animationSpeedAdjustment,
    [animationSpeedAdjustment],
  );

  return (
    <AppContext.Provider
      value={{
        navAnimationSeconds,
        isContactFormOpen,
        setIsContactFormOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
