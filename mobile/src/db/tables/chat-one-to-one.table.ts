import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { z } from "zod";
import { createSelectSchema, createInsertSchema } from "drizzle-zod";
import { SnowFlakeId } from "@/lib/snowflake";

export const CHAT_ONE_TO_ONE_TABLE_NAME = "chat_one_to_one";

export const chatOneToOneTable = sqliteTable(CHAT_ONE_TO_ONE_TABLE_NAME, {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => new SnowFlakeId(1).generate().toString()),
  conversationId: text("conversation_id").unique().notNull(),
  text: text("text", { length: 2000 }).notNull(),
  mode: text("mode", { enum: ["SENT", "RECEIVED"] }).notNull(),
  status: text("status", { enum: ["SENT", "DELIVERED", "SEEN"] }).notNull(),
  createdAt: integer("created_at")
    .$defaultFn(() => Date.now())
    .notNull(),
  updatedAt: integer("updated_at")
    .$onUpdate(() => Date.now())
    .notNull(),
});

export const selectChatOneToOneSchema = createSelectSchema(chatOneToOneTable);
export const insertChatOneToOneSchema = createInsertSchema(chatOneToOneTable);

export type ChatOneToOne = z.infer<typeof selectChatOneToOneSchema>;
export type InsertChatOneToOne = z.infer<typeof insertChatOneToOneSchema>;
