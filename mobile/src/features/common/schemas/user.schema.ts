import { type } from 'arktype';

export const userSchema = type({
  id: 'string.uuid',
  name: '0 < string <= 50',
  email: '0 < string.email <= 240',
  createdAt: 'string.date',
  updatedAt: 'string.date',
});

export type User = typeof userSchema.infer;
