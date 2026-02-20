import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthStore } from "./type";
import { secureStorage } from "../storage";
import { db } from "@/db";
import { resetSyncTimeStamp } from "@/db/tanstack/sync";

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
        await db.disconnectAndClear();

        set({ user: undefined, tokens: undefined, dhPrivateKey: undefined });

        resetSyncTimeStamp();
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
