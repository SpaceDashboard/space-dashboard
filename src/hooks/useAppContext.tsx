import { useContext } from 'react';
import { AppContext } from 'src/providers';

export const useAppContext = () => {
  return useContext(AppContext);
};
