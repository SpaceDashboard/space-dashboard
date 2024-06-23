import React, { createContext, PropsWithChildren, useState } from 'react';

interface AppProviderProps {
  navAnimationDuration: number;
  reduceMotion: boolean;
  setReduceMotion: React.Dispatch<React.SetStateAction<boolean>>;
  isContactFormOpen: boolean;
  setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppProviderProps>({
  navAnimationDuration: 0,
  reduceMotion: false,
  setReduceMotion: () => {},
  isContactFormOpen: false,
  setIsContactFormOpen: () => {},
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const navAnimationDuration = 2;
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        navAnimationDuration,
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
