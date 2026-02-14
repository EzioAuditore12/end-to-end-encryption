import { column, Table } from "@powersync/react-native";
import { z } from "zod";

export const UserTable = new Table({
  name: column.text,
  email: column.text,
  createdAt: column.integer,
  updatedAt: column.integer,
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string().max(50),
  email: z.email().max(240),
  createdAt: z.number().transform((val) => new Date(val)),
  updatedAt: z.number().transform((val) => new Date(val)),
});

export type User = z.infer<typeof userSchema>;
