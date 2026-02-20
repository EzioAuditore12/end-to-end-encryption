import { type } from "arktype";

export const tableNames = type(
  "'CONVERSATION-ONE-TO-ONE' | 'CHAT-ONE-TO-ONE' | 'USER'",
).array();
