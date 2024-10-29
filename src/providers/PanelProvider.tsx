import React, { useMemo, useState } from 'react';
import { PanelContext } from 'src/providers';

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
