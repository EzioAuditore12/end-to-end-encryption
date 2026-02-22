import type { StateStorage } from 'zustand/middleware';
import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store';
import { createMMKV } from 'react-native-mmkv';

const mmkvStorage = createMMKV();

export const mmkvZustandStorage: StateStorage = {
  setItem: (name, value) => {
    return mmkvStorage.set(name, value);
  },
  getItem: (name) => {
    const value = mmkvStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return mmkvStorage.remove(name);
  },
};

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
