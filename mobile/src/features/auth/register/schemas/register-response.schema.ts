import { type } from "arktype";

import { tokensSchema } from "@/features/common/schemas/tokens.schema";
import { userSchema } from "@/features/common/schemas/user.schema";

export const registerResponseSchema = type({
  user: userSchema,
  tokens: tokensSchema,
});

export type RegisterReponse = typeof registerResponseSchema.infer;
