import { column, Table } from '@powersync/react-native';
import { type } from 'arktype';

export const USER_TABLE_NAME = 'user';

export const UserTable = new Table({
  name: column.text,
  email: column.text,
  dhPublicKey: column.text,
  createdAt: column.integer,
  updatedAt: column.integer,
});

export const userSchema = type({
  id: 'string.uuid',
  name: '0 < string <= 50',
  email: '0 < string.email <= 240',
  dhPublicKey: 'string | null',
  createdAt: 'number.integer',
  updatedAt: 'number.integer',
});

export type User = typeof userSchema.infer;
