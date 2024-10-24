import React, { createContext, useMemo, useState } from 'react';

interface PanelProviderProps {
  animationDurationSeconds?: number;
  setAnimationDurationSeconds?: React.Dispatch<React.SetStateAction<number>>;
  animationDelaySeconds?: number;
  setAnimationDelaySeconds?: React.Dispatch<React.SetStateAction<number>>;
  isPanelMenuOpen?: boolean;
  setIsPanelMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  componentKey?: string;
  setComponentKey?: React.Dispatch<React.SetStateAction<string>>;
}

export const PanelContext = createContext<PanelProviderProps>({});

export const PanelProvider = ({ children }: React.PropsWithChildren) => {
  const [animationDurationSeconds, setAnimationDurationSeconds] = useState(0);
  const [animationDelaySeconds, setAnimationDelaySeconds] = useState(0);
  const [isPanelMenuOpen, setIsPanelMenuOpen] = useState(false);
  const [componentKey, setComponentKey] = useState('');

  const value = useMemo(
    () => ({
      animationDurationSeconds,
      setAnimationDurationSeconds,
      animationDelaySeconds,
      setAnimationDelaySeconds,
      isPanelMenuOpen,
      setIsPanelMenuOpen,
      componentKey,
      setComponentKey,
    }),
    [
      animationDurationSeconds,
      setAnimationDurationSeconds,
      animationDelaySeconds,
      setAnimationDelaySeconds,
      isPanelMenuOpen,
      setIsPanelMenuOpen,
      componentKey,
      setComponentKey,
    ],
  );

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};
