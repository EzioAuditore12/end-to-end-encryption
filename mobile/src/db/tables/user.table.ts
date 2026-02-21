import { tableSchema } from "@nozbe/watermelondb";
import { type } from "arktype";

export const USER_TABLE_NAME = "user";

export const UserTable = tableSchema({
  name: USER_TABLE_NAME,
  columns: [
    { name: "name", type: "string" },
    { name: "email", type: "string" },
    { name: "dh_public_key", type: "string", isOptional: true },
    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});

export const userSchema = type({
  id: "string.uuid",
  name: "0 < string <= 50",
  email: "0 < string.email <= 240",
  dhPublicKey: "string | null",
  createdAt: "number.integer",
  updatedAt: "number.integer",
});

export type User = typeof userSchema.infer;
