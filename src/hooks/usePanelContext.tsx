import { useContext } from 'react';
import { PanelContext } from 'src/providers/PanelProvider';

export const usePanelContext = () => {
  return useContext(PanelContext);
};
