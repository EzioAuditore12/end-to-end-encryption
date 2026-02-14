import { column, Table } from "@powersync/react-native";
import { z } from "zod";

export const ConversationOneToOneTable = new Table({
  userId: column.text,
  createdAt: column.integer,
  updatedAt: column.integer,
});

export const conversationOneToOneSchema = z.object({
  id: z.string(),
  userId: z.string(),
  createdAt: z.number().transform((val) => new Date(val)),
  updatedAt: z.number().transform((val) => new Date(val)),
});

export type ConversationOneToOne = z.infer<typeof conversationOneToOneSchema>;
