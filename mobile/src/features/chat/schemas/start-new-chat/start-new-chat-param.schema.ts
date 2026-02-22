import { type } from 'arktype';

export const startNewChatParamSchema = type({
  receiverId: 'string.uuid',
  text: '0 < string <= 1000',
});

export type StartNewChatParam = typeof startNewChatParamSchema.infer;
