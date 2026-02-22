import { type } from 'arktype';

export const tokensSchema = type({
  accessToken: 'string',
  refreshToken: 'string',
});

export type Tokens = typeof tokensSchema.infer;
