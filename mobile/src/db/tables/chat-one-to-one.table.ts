import { column, Table } from "@powersync/react-native";
import { z } from "zod";

export const ChatOneToOneTable = new Table({
  conversationId: column.text,
  text: column.text,
  mode: column.text,
  status: column.text,
  createdAt: column.integer,
  updatedAt: column.integer,
});

export const chatOneToOneSchema = z.object({
  id: z.string(),
  conversationId: z.string(),
  text: z.string().max(1000),
  mode: z.enum(["SENT", "RECEIVED"]),
  status: z.enum(["SENT", "DELIVERED", "SEEN"]),
  createdAt: z.number().transform((val) => new Date(val)),
  updatedAt: z.number().transform((val) => new Date(val)),
});

export type ChatOneToOne = z.infer<typeof chatOneToOneSchema>;
