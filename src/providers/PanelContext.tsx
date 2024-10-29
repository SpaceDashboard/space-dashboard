import React, { createContext } from 'react';

interface PanelContextProps {
  animationDurationSeconds?: number;
  setAnimationDurationSeconds?: React.Dispatch<React.SetStateAction<number>>;
  animationDelaySeconds?: number;
  setAnimationDelaySeconds?: React.Dispatch<React.SetStateAction<number>>;
  isPanelMenuOpen?: boolean;
  setIsPanelMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  componentKey?: string;
  setComponentKey?: React.Dispatch<React.SetStateAction<string>>;
}

export const PanelContext = createContext<PanelContextProps>({});
