import { useContext } from 'react';
import { AppContext } from 'src/providers/AppProvider';

export const useAppContext = () => {
  return useContext(AppContext);
};
