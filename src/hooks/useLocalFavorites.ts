import { useCallback, useEffect, useMemo, useState } from 'react';

const FAVORITES_STORAGE_KEY = 'workout:favorites';

const canUseLocalStorage = () => {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false;
    }

    const testKey = `${FAVORITES_STORAGE_KEY}:test`;
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
};

const readFavorites = () => {
  if (!canUseLocalStorage()) {
    return [] as string[];
  }

  try {
    const storedValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!storedValue) {
      return [] as string[];
    }

    const parsedValue: unknown = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue)) {
      return [] as string[];
    }

    return parsedValue.filter((favorite): favorite is string => typeof favorite === 'string');
  } catch {
    return [] as string[];
  }
};

const writeFavorites = (favorites: string[]) => {
  if (!canUseLocalStorage()) {
    return;
  }

  try {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Ignore quota and privacy-mode failures; the in-memory state still works.
  }
};

export const useLocalFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => readFavorites());

  useEffect(() => {
    writeFavorites(favoriteIds);
  }, [favoriteIds]);

  const favoriteIdSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const isFavorite = useCallback(
    (workoutId: string) => favoriteIdSet.has(workoutId),
    [favoriteIdSet],
  );

  const saveFavorite = useCallback((workoutId: string) => {
    setFavoriteIds((currentFavoriteIds) => {
      if (currentFavoriteIds.includes(workoutId)) {
        return currentFavoriteIds;
      }

      return [...currentFavoriteIds, workoutId];
    });
  }, []);

  const unsaveFavorite = useCallback((workoutId: string) => {
    setFavoriteIds((currentFavoriteIds) => currentFavoriteIds.filter((id) => id !== workoutId));
  }, []);

  const toggleFavorite = useCallback((workoutId: string) => {
    setFavoriteIds((currentFavoriteIds) => {
      if (currentFavoriteIds.includes(workoutId)) {
        return currentFavoriteIds.filter((id) => id !== workoutId);
      }

      return [...currentFavoriteIds, workoutId];
    });
  }, []);

  return {
    favoriteIds,
    isFavorite,
    saveFavorite,
    toggleFavorite,
    unsaveFavorite,
  };
};
