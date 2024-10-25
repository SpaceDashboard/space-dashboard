import { useState } from 'react';
import { showToast } from 'src/shared/utils';

// Fallback in-memory storage
const memoryStorage: Record<string, any> = {};

const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const validateSettings = <T extends Record<string, any>>(
  settings: any,
  defaultSettings: T,
): T => {
  const validatedSettings: T = { ...defaultSettings };

  for (const key in defaultSettings) {
    if (key in settings) {
      const defaultValue = defaultSettings[key];
      const settingValue = settings[key];
      const defaultType = typeof defaultValue;
      const actualType = typeof settingValue;

      if (defaultType === actualType) {
        if (defaultType === 'object' && !Array.isArray(defaultValue)) {
          // Recursively validate nested objects
          validatedSettings[key] = validateSettings(settingValue, defaultValue);
        } else {
          validatedSettings[key] = settingValue;
        }
      }
    }
  }

  return validatedSettings;
};

const mergeWithDefaults = <T extends Record<string, any>>(
  settings: any,
  defaultSettings: T,
): T => {
  const mergedSettings: T = { ...defaultSettings };

  for (const key in settings) {
    const defaultValue = defaultSettings[key];
    const settingValue = settings[key];

    if (
      defaultValue &&
      typeof settingValue === 'object' &&
      !Array.isArray(settingValue)
    ) {
      // Recursively merge nested objects
      (mergedSettings[key] as T[Extract<keyof T, string>]) = mergeWithDefaults(
        settingValue,
        defaultValue,
      );
    } else if (key === 'label') {
      // Always pull default panel label, in case it's been updated
      (mergedSettings[key] as T) = defaultValue;
    } else {
      (mergedSettings[key] as T) = settingValue as T[Extract<keyof T, string>];
    }
  }

  return mergedSettings;
};

const getSettingWithUpdatedPanels = <T extends Record<string, any>>(
  settings: T,
  defaultSettings: T,
): T => {
  const defaultPanels = [
    ...defaultSettings.column1Order,
    ...defaultSettings.column2Order,
    ...defaultSettings.column3Order,
  ];
  const savedPanels = [
    ...settings.column1Order,
    ...settings.column2Order,
    ...settings.column3Order,
  ];
  const newDefaultPanels = defaultPanels.filter(
    (panel) => !savedPanels.includes(panel),
  );
  const deletedDefaultPanels = savedPanels.filter(
    (panel) => !defaultPanels.includes(panel),
  );

  // Add new panels
  for (const panel of newDefaultPanels) {
    for (const column of [
      'column1Order',
      'column2Order',
      'column3Order',
    ] as const) {
      if (defaultSettings[column].includes(panel)) {
        settings[column].push(panel);
      }
    }
  }

  // Remove deleted panels
  for (const panel of deletedDefaultPanels) {
    for (const column of [
      'column1Order',
      'column2Order',
      'column3Order',
    ] as const) {
      if (settings[column].includes(panel)) {
        settings[column].splice(settings[column].indexOf(panel), 1);
      }
    }
  }

  if (newDefaultPanels.length > 0) {
    setTimeout(() => {
      showToast(
        'New panels or settings have been added. Check them out!',
        { variant: 'info' },
        true,
      );
    }, 6000);
  }

  return { ...settings };
};

export const useLocalStorage = <T extends Record<string, any>>(
  key: string,
  defaultValue: T,
): [T, (value: T | ((prev: T) => T)) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isLocalStorageAvailable()) {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          const parsedItem = JSON.parse(item);
          const validatedSettings = validateSettings(parsedItem, defaultValue);
          const mergedSettings = mergeWithDefaults(
            validatedSettings,
            defaultValue,
          );
          localStorage.setItem(
            key,
            JSON.stringify(
              getSettingWithUpdatedPanels(mergedSettings, defaultValue),
            ),
          );
          return mergedSettings;
        } else {
          localStorage.setItem(key, JSON.stringify(defaultValue));
          return defaultValue;
        }
      } catch (error) {
        console.error(error);
        return defaultValue;
      }
    } else {
      return memoryStorage[key] ?? defaultValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (isLocalStorageAvailable()) {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      } else {
        memoryStorage[key] = valueToStore;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
