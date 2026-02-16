import { type } from "arktype";

import { tokensSchema } from "@/features/common/schemas/tokens.schema";
import { userSchema } from "@/features/common/schemas/user.schema";

export const loginResponseSchema = type({
  user: userSchema,
  tokens: tokensSchema,
});

export type LoginReponse = typeof loginResponseSchema.infer;
