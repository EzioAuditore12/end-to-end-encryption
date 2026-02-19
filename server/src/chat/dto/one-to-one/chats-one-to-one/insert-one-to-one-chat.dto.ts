import { createZodDto } from 'nestjs-zod';
import { chatsOneToOneSchema } from './chats-one-to-one.dto';

export const insertOneToOneChatSchema = chatsOneToOneSchema.partial({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export class InsertOneToOneChatDto extends createZodDto(insertOneToOneChatSchema) {
  createdAt?: Date;
  updatedAt?: Date;
}
