import type { User } from "@/features/common/schemas/user.schema";
import type { Tokens } from "@/features/common/schemas/tokens.schema";

export type AuthStore = {
  user: User | undefined;
  tokens: Tokens | undefined;
  setUser: (data: User) => void;
  setTokens: (data: Tokens) => void;
  logout: () => void;
};
