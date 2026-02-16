import { column, Table } from "@powersync/react-native";
import { type } from "arktype";

export const UserTable = new Table({
  name: column.text,
  email: column.text,
  createdAt: column.integer,
  updatedAt: column.integer,
});

export const userSchema = type({
  id: "string",
  name: "0 < string <= 50",
  email: "0 < string.email <= 240",
  createdAt: type("number.integer").pipe((val) => new Date(val)),
  updatedAt: type("number.integer").pipe((val) => new Date(val)),
});

export type User = typeof userSchema.infer;
