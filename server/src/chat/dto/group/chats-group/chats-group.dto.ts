import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const chatsGroupSchema = z.object({
  id: z.any().transform((val) => String(val)),
  conversationId: z.any().transform((val) => String(val)),
  senderId: z.uuid(),
  text: z.string().max(1000),
  deliveredTo: z.array(z.uuid()),
  seenBy: z.array(z.uuid()),
  createdAt: z.any(),
  updatedAt: z.any(),
});

export const convertChatsGroupFromMongoose = chatsGroupSchema
  .omit({ id: true })
  .extend({ _id: z.any().transform((val) => String(val)) })
  .transform(({ _id, ...rest }) => ({
    id: _id,
    ...rest,
  }));

export class ChatsGroupDto extends createZodDto(chatsGroupSchema) {}
