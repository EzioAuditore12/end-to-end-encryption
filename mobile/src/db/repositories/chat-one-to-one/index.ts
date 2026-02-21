import { database } from "@/db";

import { CHAT_ONE_TO_ONE_TABLE_NAME } from "@/db/tables/chat-one-to-one.table";
import { CreateChatOneToOneDto } from "./dto/create-chat-one-to-one.dto";
import { ChatOneToOne } from "@/db/models/chat-one-to-one.model";

export class ChatOneToOneRepository {
  TABLE_NAME = CHAT_ONE_TO_ONE_TABLE_NAME;

  async create(createChatOneToOneDto: CreateChatOneToOneDto) {
    return await database.write(async () => {
      return await database
        .get<ChatOneToOne>(this.TABLE_NAME)
        .create((chatOneToOne) => {
          if (createChatOneToOneDto.id) chatOneToOne._raw.id = chatOneToOne.id;

          chatOneToOne._setRaw(
            "conversation_id",
            createChatOneToOneDto.conversationId,
          );

          chatOneToOne.text = createChatOneToOneDto.text;
          chatOneToOne.mode = createChatOneToOneDto.mode;
          chatOneToOne.status = createChatOneToOneDto.status;

          if (createChatOneToOneDto.createdAt !== undefined)
            chatOneToOne.createdAt = createChatOneToOneDto.createdAt;

          if (createChatOneToOneDto.updatedAt !== undefined)
            chatOneToOne.updatedAt = createChatOneToOneDto.updatedAt;
        });
    });
  }
}

export const chatOneToOneRepository = new ChatOneToOneRepository();
