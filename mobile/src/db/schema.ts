import { Schema } from "@powersync/react-native";

import {
  CONVERSATION_ONE_TO_ONE_TABLE_NAME,
  ConversationOneToOneTable,
} from "./tables/conversation-one-to-one.table";
import {
  ChatOneToOneTable,
  CHAT_ONE_TO_ONE_TABLE_NAME,
} from "./tables/chat-one-to-one.table";
import { USER_TABLE_NAME, UserTable } from "./tables/user.table";

export const AppSchema = new Schema({
  [CONVERSATION_ONE_TO_ONE_TABLE_NAME]: ConversationOneToOneTable,
  [CHAT_ONE_TO_ONE_TABLE_NAME]: ChatOneToOneTable,
  [USER_TABLE_NAME]: UserTable,
});
