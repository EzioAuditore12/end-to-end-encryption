import { Schema } from "@powersync/react-native";

import { ConversationOneToOneTable } from "./tables/conversation-one-to-one.table";
import { ChatOneToOneTable } from "./tables/chat-one-to-one.table";
import { UserTable } from "./tables/user.table";

export const AppSchema = new Schema({
  conversationsOneToOne: ConversationOneToOneTable,
  chatsOneToOne: ChatOneToOneTable,
  user: UserTable,
});
