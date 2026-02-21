import { Model } from "@nozbe/watermelondb";
import { date, relation, text } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";

import { CHAT_ONE_TO_ONE_TABLE_NAME } from "../tables/chat-one-to-one.table";
import { CONVERSATION_ONE_TO_ONE_TABLE_NAME } from "../tables/conversation-one-to-one.table";

import { ConversationOneToOne } from "./conversation-one-to-one.model";

export class ChatOneToOne extends Model {
  static table = CHAT_ONE_TO_ONE_TABLE_NAME;

  static associations: Associations = {
    [CONVERSATION_ONE_TO_ONE_TABLE_NAME]: {
      type: "belongs_to",
      key: "conversation_id",
    },
  };

  @relation(CONVERSATION_ONE_TO_ONE_TABLE_NAME, "conversation_id")
  conversation!: Promise<ConversationOneToOne>;

  @text("text")
  text!: string;

  @text("mode")
  mode!: "SENT" | "RECEIVED";

  @text("status")
  status!: "SENT" | "DELIVERED" | "SEEN";

  @date("created_at")
  createdAt!: Date;

  @date("updated_at")
  updatedAt!: Date;
}
