import { type } from "arktype";

export const startNewChatResponseSchema = type({
  id: "string",
  conversationId: "string",
  senderId: "string.uuid",
  text: "0 < string <= 1000",
  createdAt: "string.date",
  updatedAt: "string.date",
});

export type StartNewChatResponse = typeof startNewChatResponseSchema.infer;
