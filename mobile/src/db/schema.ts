import { DrizzleAppSchema } from "@powersync/drizzle-driver";

import { userTable } from "./tables/user.table";
import { conversationOneToOneTable } from "./tables/conversation-one-to-one.table";
import { chatOneToOneTable } from "./tables/chat-one-to-one.table";

export const drizzleSchema = {
  userTable,
  conversationOneToOneTable,
  chatOneToOneTable,
};

export const AppSchema = new DrizzleAppSchema(drizzleSchema);