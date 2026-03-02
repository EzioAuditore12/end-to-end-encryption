import { createZodDto } from 'nestjs-zod';
import { chatsGroupSchema } from './chats-group.dto';

export const insertGroupChatSchema = chatsGroupSchema
  .omit({
    deliveredTo: true,
    seenBy: true,
  })
  .partial({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export class InsertGroupChatDto extends createZodDto(insertGroupChatSchema) {
  createdAt?: Date;
  updatedAt?: Date;
}
