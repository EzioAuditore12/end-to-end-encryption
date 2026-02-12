import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AuthStore } from "./type";
import { secureStorage } from "../storage";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      tokens: undefined,
      setUser(data) {
        set({ user: data });
      },
      setTokens(data) {
        set({ tokens: data });
      },
      logout() {
        set({ user: undefined, tokens: undefined });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => secureStorage),
    },
  ),
);
