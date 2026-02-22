import { tokensSchema } from '@/features/common/schemas/tokens.schema';

export const refreshResponseSchema = tokensSchema;

export type RefreshResponse = typeof refreshResponseSchema.infer;
