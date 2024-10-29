import React, { createContext } from 'react';

interface AppContextProps {
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

export const AppContext = createContext<AppContextProps>({
  navAnimationSeconds: 0,
  allPanelsLoaded: false,
  setIsAboutOpen: () => {},
  setIsContactFormOpen: () => {},
  setIsUserSettingsOpen: () => {},
});
