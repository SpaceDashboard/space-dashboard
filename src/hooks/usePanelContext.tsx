import { useContext } from 'react';
import { PanelContext } from 'src/providers';

export const usePanelContext = () => {
  return useContext(PanelContext);
};
