import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { SnowFlakeId } from "@/lib/snowflake";

import { User, USER_TABLE_NAME, userTable } from "./user.table";

export const CONVERSATION_ONE_TO_ONE_TABLE_NAME = "conversation_one_to_one";

export const conversationOneToOneTable = sqliteTable(
  CONVERSATION_ONE_TO_ONE_TABLE_NAME,
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => new SnowFlakeId(1).generate().toString()),
    userId: text("user_id")
      .unique()
      .notNull()
      .references(() => userTable.id),
    createdAt: integer("created_at")
      .$defaultFn(() => Date.now())
      .notNull(),
    updatedAt: integer("updated_at")
      .$onUpdate(() => Date.now())
      .notNull(),
  },
);

export const selectConversationOneToOneSchema = createSelectSchema(
  conversationOneToOneTable,
);

export const insertConversationOneToOneSchema = createInsertSchema(
  conversationOneToOneTable,
);

export type ConversationOneToOne = z.infer<
  typeof selectConversationOneToOneSchema
>;
export type InsertConversationOneToOne = z.infer<
  typeof insertConversationOneToOneSchema
>;

export type ConversationOneToOneJoinWithUser = {
  [CONVERSATION_ONE_TO_ONE_TABLE_NAME]: ConversationOneToOne;
  [USER_TABLE_NAME]: User | null;
};
