import { tableSchema } from "@nozbe/watermelondb";

export const CHAT_ONE_TO_ONE_TABLE_NAME = "chat_one_to_one";

export const ChatOneToOneTable = tableSchema({
  name: CHAT_ONE_TO_ONE_TABLE_NAME,
  columns: [
    { name: "conversation_id", type: "string" },
    { name: "text", type: "string" },
    { name: "mode", type: "string" },
    { name: "status", type: "string" },
    { name: "created_at", type: "number" },
    { name: "updated_at", type: "number" },
  ],
});
