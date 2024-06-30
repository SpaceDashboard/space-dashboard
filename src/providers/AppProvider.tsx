import React, { createContext, PropsWithChildren, useState } from 'react';

interface AppProviderProps {
  navAnimationDurationSeconds: number;
  reduceMotion: boolean;
  setReduceMotion: React.Dispatch<React.SetStateAction<boolean>>;
  isContactFormOpen: boolean;
  setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppProviderProps>({
  navAnimationDurationSeconds: 0,
  reduceMotion: false,
  setReduceMotion: () => {},
  isContactFormOpen: false,
  setIsContactFormOpen: () => {},
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const navAnimationDurationSeconds = 1.85;
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        navAnimationDurationSeconds,
        reduceMotion,
        setReduceMotion,
        isContactFormOpen,
        setIsContactFormOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
