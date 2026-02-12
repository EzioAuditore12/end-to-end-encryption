import type { StateStorage } from "zustand/middleware";
import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";

export const secureStorage: StateStorage = {
  async setItem(name, value) {
    await setItemAsync(name, value);
  },
  async getItem(name) {
    return await getItemAsync(name);
  },
  async removeItem(name) {
    await deleteItemAsync(name);
  },
};
