import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvZustandStorage } from "../storage";
import { DeviceStore } from "./type";

export const useDeviceStore = create<DeviceStore>()(
  persist(
    (set, get) => ({
      lastSyncedAt: 0,
      getLastSyncedAt() {
        const { lastSyncedAt } = get();
        return lastSyncedAt;
      },
      updateLastSynedAt(data) {
        set({ lastSyncedAt: data });
      },
      resetTimeStamp() {
        set({ lastSyncedAt: 0 });
      },
    }),
    {
      name: "device-store",
      storage: createJSONStorage(() => mmkvZustandStorage),
    },
  ),
);
