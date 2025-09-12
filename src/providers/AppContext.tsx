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
  issLiveFeedVideoId3?: string;
  setIssLiveFeedVideoId1: React.Dispatch<React.SetStateAction<string>>;
  setIssLiveFeedVideoId2: React.Dispatch<React.SetStateAction<string>>;
  setIssLiveFeedVideoId3: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextProps>({
  navAnimationSeconds: 0,
  allPanelsLoaded: false,
  setIsAboutOpen: () => {},
  setIsContactFormOpen: () => {},
  setIsUserSettingsOpen: () => {},
  issLiveFeedVideoId1: '',
  issLiveFeedVideoId2: '',
  issLiveFeedVideoId3: '',
  setIssLiveFeedVideoId1: () => {},
  setIssLiveFeedVideoId2: () => {},
  setIssLiveFeedVideoId3: () => {},
});
