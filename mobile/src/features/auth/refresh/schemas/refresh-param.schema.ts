import { type } from "arktype";

export const refreshParamSchema = type({
  refreshToken: "string",
});

export type RefreshParam = typeof refreshParamSchema.infer;
