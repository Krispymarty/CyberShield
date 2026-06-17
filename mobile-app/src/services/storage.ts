/**
 * Pure JavaScript in-memory storage.
 * No native modules required — works everywhere:
 * Expo Go, dev builds, web, iOS, Android.
 * 
 * Data does not persist between app restarts.
 * For production, rebuild with `npx expo prebuild` to enable
 * expo-secure-store or AsyncStorage.
 */

const _store = new Map<string, string>();

export const storage = {
  async getItemAsync(key: string): Promise<string | null> {
    return _store.get(key) ?? null;
  },

  async setItemAsync(key: string, value: string): Promise<void> {
    _store.set(key, value);
  },

  async deleteItemAsync(key: string): Promise<void> {
    _store.delete(key);
  },
};
