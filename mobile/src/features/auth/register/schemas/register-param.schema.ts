import { userSchema } from "@/features/common/schemas/user.schema";

export const registerParamSchema = userSchema.pick("name", "email").and({
  password: "0 < string <= 16",
  dhPublicKey: "string",
});

export type RegisterParam = typeof registerParamSchema.infer;
