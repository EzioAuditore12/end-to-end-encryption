import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const chatsOneToOneSchema = z.object({
  id: z.any().transform((val) => String(val)),
  conversationId: z.any().transform((val) => String(val)),
  senderId: z.uuid(),
  text: z.string().max(1000),
  status: z.enum(['SENT', 'DELIVERED', 'SEEN']),
  createdAt: z.any(),
  updatedAt: z.any(),
});

export const convertChatsOneToOneFromMongoose = chatsOneToOneSchema
  .omit({ id: true })
  .extend({ _id: z.any().transform((val) => String(val)) })
  .transform(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
  }));

export class ChatsOneToOneDto extends createZodDto(chatsOneToOneSchema) {}
