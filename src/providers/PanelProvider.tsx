import React, { createContext, useState } from 'react';

interface PanelProviderProps {
  animationDurationSeconds?: number;
  setAnimationDurationSeconds?: React.Dispatch<React.SetStateAction<number>>;
  animationDelaySeconds?: number;
  setAnimationDelaySeconds?: React.Dispatch<React.SetStateAction<number>>;
}

export const PanelContext = createContext<PanelProviderProps>({});

export const PanelProvider = ({ children }: React.PropsWithChildren) => {
  const [animationDurationSeconds, setAnimationDurationSeconds] = useState(0);
  const [animationDelaySeconds, setAnimationDelaySeconds] = useState(0);

  return (
    <PanelContext.Provider
      value={{
        animationDurationSeconds,
        setAnimationDurationSeconds,
        animationDelaySeconds,
        setAnimationDelaySeconds,
      }}
    >
      {children}
    </PanelContext.Provider>
  );
};
