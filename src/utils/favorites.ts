type FavoriteType = 'postcards' | 'quotes' | 'gallery';

const STORAGE_KEYS: Record<FavoriteType, string> = {
  postcards: 'favoritePostcards',
  quotes: 'favoriteQuotes',
  gallery: 'favoriteGallery',
};

export function getFavorites(type: FavoriteType): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS[type]);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read favorites from localStorage', e);
    return [];
  }
}

export function isFavorite(type: FavoriteType, id: string): boolean {
  const list = getFavorites(type);
  return list.includes(id);
}

export function addFavorite(type: FavoriteType, id: string): string[] {
  try {
    const list = getFavorites(type);
    if (!list.includes(id)) {
      const updated = [...list, id];
      localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(updated));
      window.dispatchEvent(new Event('favorites-updated'));
      return updated;
    }
    return list;
  } catch (e) {
    console.error('Failed to add favorite to localStorage', e);
    return [];
  }
}

export function removeFavorite(type: FavoriteType, id: string): string[] {
  try {
    const list = getFavorites(type);
    const updated = list.filter((item) => item !== id);
    localStorage.setItem(STORAGE_KEYS[type], JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-updated'));
    return updated;
  } catch (e) {
    console.error('Failed to remove favorite from localStorage', e);
    return [];
  }
}

export function toggleFavorite(type: FavoriteType, id: string): boolean {
  if (isFavorite(type, id)) {
    removeFavorite(type, id);
    return false;
  } else {
    addFavorite(type, id);
    return true;
  }
}
