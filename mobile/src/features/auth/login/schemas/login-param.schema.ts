import { type } from 'arktype';

export const loginParamSchema = type({
  email: '0 < string.email <= 240',
  password: 'string > 0',
});

export type LoginParam = typeof loginParamSchema.infer;
