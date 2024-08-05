import React, { createContext, useMemo, useState } from 'react';

interface PanelProviderProps {
  animationDurationSeconds?: number;
  setAnimationDurationSeconds?: React.Dispatch<React.SetStateAction<number>>;
  animationDelaySeconds?: number;
  setAnimationDelaySeconds?: React.Dispatch<React.SetStateAction<number>>;
  isPanelMenuOpen?: boolean;
  setIsPanelMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PanelContext = createContext<PanelProviderProps>({});

export const PanelProvider = ({
  children,
  isMenuOpen,
}: React.PropsWithChildren<{ isMenuOpen?: boolean }>) => {
  const [animationDurationSeconds, setAnimationDurationSeconds] = useState(0);
  const [animationDelaySeconds, setAnimationDelaySeconds] = useState(0);
  const [isPanelMenuOpen, setIsPanelMenuOpen] = useState(isMenuOpen ?? false);

  const value = useMemo(
    () => ({
      animationDurationSeconds,
      setAnimationDurationSeconds,
      animationDelaySeconds,
      setAnimationDelaySeconds,
      isPanelMenuOpen,
      setIsPanelMenuOpen,
    }),
    [
      animationDurationSeconds,
      setAnimationDurationSeconds,
      animationDelaySeconds,
      setAnimationDelaySeconds,
      isPanelMenuOpen,
      setIsPanelMenuOpen,
    ],
  );

  return (
    <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
  );
};
