import { useContext } from 'react';
import { SettingsContext, SettingsContextProps } from 'src/providers';

export const useSettingsContext = (): SettingsContextProps => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error(
      'useSettingsContext must be used within a SettingsProvider',
    );
  }
  return context;
};
