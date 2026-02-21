import { Model, Relation } from "@nozbe/watermelondb";
import { children, date, relation } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";

import { CONVERSATION_ONE_TO_ONE_TABLE_NAME } from "../tables/conversation-one-to-one.table";
import { CHAT_ONE_TO_ONE_TABLE_NAME } from "../tables/chat-one-to-one.table";
import { USER_TABLE_NAME } from "../tables/user.table";

import { User } from "./user.model";
import { ChatOneToOne } from "./chat-one-to-one.model";

export class ConversationOneToOne extends Model {
  static table = CONVERSATION_ONE_TO_ONE_TABLE_NAME;

  static associations: Associations = {
    [CHAT_ONE_TO_ONE_TABLE_NAME]: {
      type: "has_many",
      foreignKey: "conversation_id",
    },

    [USER_TABLE_NAME]: {
      type: "belongs_to",
      key: "user_id",
    },
  };

  @relation(USER_TABLE_NAME, "user_id")
  user!: Relation<User>;

  @children(CHAT_ONE_TO_ONE_TABLE_NAME)
  chats!: Promise<ChatOneToOne>;

  @date("created_at")
  createdAt!: Date;

  @date("updated_at")
  updatedAt!: Date;
}
