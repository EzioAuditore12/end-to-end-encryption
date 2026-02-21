import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthStore } from "./type";
import { secureStorage } from "../storage";

import { database } from "@/db";

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
        await database.write(async () => {
          await database.unsafeResetDatabase();
        });

        set({ user: undefined, tokens: undefined, dhPrivateKey: undefined });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
