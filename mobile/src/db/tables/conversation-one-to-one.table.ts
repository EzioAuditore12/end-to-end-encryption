import { tableSchema } from "@nozbe/watermelondb";

export const CONVERSATION_ONE_TO_ONE_TABLE_NAME = "conversation_one_to_one";

export const ConversationOneToOneTable = tableSchema({
  name: CONVERSATION_ONE_TO_ONE_TABLE_NAME,
  columns: [
    { name: "user_id", type: "string" },
    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});
