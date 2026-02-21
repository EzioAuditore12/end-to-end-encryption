import { Database, type TableSchema } from "@nozbe/watermelondb";
import {
  DatabaseProvider as WatermelondbDatabaseProvider,
  withDatabase,
} from "@nozbe/watermelondb/react";
import type { PropsWithChildren } from "react";

import { createAdapter } from "./adapter";
import { migrations } from "./migrations";
import { createSchema } from "./schema";

import { ConversationOneToOneTable } from "./tables/conversation-one-to-one.table";
import { ChatOneToOneTable } from "./tables/chat-one-to-one.table";
import { UserTable } from "./tables/user.table";

import { User } from "./models/user.model";
import { ConversationOneToOne } from "./models/conversation-one-to-one.model";
import { ChatOneToOne } from "./models/chat-one-to-one.model";

const tables: TableSchema[] = [
  UserTable,
  ConversationOneToOneTable,
  ChatOneToOneTable,
];

const models = [User, ConversationOneToOne, ChatOneToOne];

const schema = createSchema(tables);

export const database = new Database({
  adapter: createAdapter(schema, migrations),
  modelClasses: models,
});

export function DatabaseProvider({ children }: PropsWithChildren) {
  return (
    <WatermelondbDatabaseProvider database={database}>
      {children}
    </WatermelondbDatabaseProvider>
  );
}

export { withDatabase };
