import { useContext } from 'react';
import { PanelContext } from '../providers/PanelProvider';

export const usePanelContext = () => {
  return useContext(PanelContext);
};
