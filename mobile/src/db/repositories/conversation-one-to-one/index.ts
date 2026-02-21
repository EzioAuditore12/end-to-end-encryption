import { database } from "@/db";

import { CONVERSATION_ONE_TO_ONE_TABLE_NAME } from "../../tables/conversation-one-to-one.table";
import type { CreateConversationOneToOneDto } from "./dto/create-conversation-one-to-one.dto";
import { ConversationOneToOne } from "@/db/models/conversation-one-to-one.model";

export class ConversationOneToOneRepository {
  TABLE_NAME = CONVERSATION_ONE_TO_ONE_TABLE_NAME;

  async create(createConversationOneToOneDto: CreateConversationOneToOneDto) {
    return await database.write(async () => {
      return await database
        .get<ConversationOneToOne>(this.TABLE_NAME)
        .create((conversationOneToOne) => {
          if (createConversationOneToOneDto.id)
            conversationOneToOne._raw.id = createConversationOneToOneDto.id;

          conversationOneToOne._setRaw(
            "user_id",
            createConversationOneToOneDto.userId,
          );

          if (createConversationOneToOneDto.createdAt !== undefined)
            conversationOneToOne.createdAt =
              createConversationOneToOneDto.createdAt;

          if (createConversationOneToOneDto.updatedAt !== undefined)
            conversationOneToOne.updatedAt =
              createConversationOneToOneDto.updatedAt;
        });
    });
  }
}

export const conversationOneToOneRepository =
  new ConversationOneToOneRepository();
