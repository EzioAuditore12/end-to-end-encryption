export type CreateChatOneToOneDto = {
  id?: string;
  conversationId: string;
  text: string;
  mode: "SENT" | "RECEIVED";
  status: "SENT" | "DELIVERED" | "SEEN";
  createdAt?: Date;
  updatedAt?: Date;
};
