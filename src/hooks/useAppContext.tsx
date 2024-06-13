import { useContext } from 'react';
import { AppContext } from '../providers/AppProvider';

export const useAppContext = () => {
  return useContext(AppContext);
};
