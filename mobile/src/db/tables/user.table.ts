import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import crypto from 'react-native-nitro-crypto';

export const USER_TABLE_NAME = 'user';

export const userTable = sqliteTable(USER_TABLE_NAME, {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name', { length: 50 }).notNull(),
  email: text('email', { length: 240 }).unique().notNull(),
  dhPublicKey: text('dh_public_key'),
  createdAt: integer('created_at')
    .$defaultFn(() => Date.now())
    .notNull(),
  updatedAt: integer('updated_at')
    .$onUpdate(() => Date.now())
    .notNull(),
});

export const selectUserSchema = createSelectSchema(userTable);

export const insertUserSchema = createInsertSchema(userTable);

export type User = z.infer<typeof selectUserSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
