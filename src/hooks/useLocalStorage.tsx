import { useState } from 'react';

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

const validateSettings = <T,>(settings: any, defaultSettings: T): T => {
  const validatedSettings: any = { ...defaultSettings };

  for (const key in defaultSettings) {
    const hasKey = key in settings;
    if (hasKey) {
      const defaultType = typeof defaultSettings[key];
      const actualType = typeof settings[key];

      if (defaultType === actualType) {
        validatedSettings[key] = settings[key];
      }
    }
  }

  return validatedSettings;
};

const mergeWithDefaults = <T,>(settings: any, defaultSettings: T): T => {
  return { ...defaultSettings, ...settings };
};

export const useLocalStorage = <T,>(
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
          localStorage.setItem(key, JSON.stringify(mergedSettings));
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
