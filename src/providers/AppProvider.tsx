import React, { createContext, PropsWithChildren, useState } from 'react';

interface AppProviderProps {
  isContactFormOpen: boolean;
  setIsContactFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<AppProviderProps>({
  isContactFormOpen: false,
  setIsContactFormOpen: () => {},
});

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isContactFormOpen,
        setIsContactFormOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
