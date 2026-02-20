import { column, Table } from "@powersync/react-native";
import { type } from "arktype";

export const ConversationOneToOneTable = new Table({
  userId: column.text,
  createdAt: column.integer,
  updatedAt: column.integer,
});

export const conversationOneToOneSchema = type({
  id: "string",
  userId: "string.uuid",
  createdAt: "number.integer",
  updatedAt: "number.integer",
});

export type ConversationOneToOne = typeof conversationOneToOneSchema.infer;
