import { column, Table } from "@powersync/react-native";
import { type } from "arktype";

export const CONVERSATION_ONE_TO_ONE_TABLE_NAME = "conversation_one_to_one";

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
