import { column, Table } from "@powersync/react-native";
import { type } from "arktype";

export const ChatOneToOneTable = new Table({
  conversationId: column.text,
  text: column.text,
  mode: column.text,
  status: column.text,
  createdAt: column.integer,
  updatedAt: column.integer,
});

export const chatOneToOneSchema = type({
  id: "string",
  conversationId: "string",
  text: "0 < string <= 1000",
  mode: '"SENT" | "RECEIVED"',
  status: '"SENT" | "DELIVERED" | "SEEN"',
  createdAt: type("number.integer").pipe((val) => new Date(val)),
  updatedAt: type("number.integer").pipe((val) => new Date(val)),
});

export type ChatOneToOne = typeof chatOneToOneSchema.infer;
