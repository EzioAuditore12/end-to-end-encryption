import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthStore } from "./type";
import { secureStorage } from "../storage";
import { powerSyncDb } from "@/db";
import { useDeviceStore } from "../device";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      tokens: undefined,
      dhPrivateKey: undefined,
      setUser(data) {
        set({ user: data });
      },
      setTokens(data) {
        set({ tokens: data });
      },
      setDhPrivateKey(key) {
        set({ dhPrivateKey: key });
      },
      async logout() {
        await powerSyncDb.disconnectAndClear();

        set({ user: undefined, tokens: undefined, dhPrivateKey: undefined });

        useDeviceStore.getState().resetTimeStamp();
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
