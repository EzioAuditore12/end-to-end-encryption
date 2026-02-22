import { OPSqliteOpenFactory } from "@powersync/op-sqlite";
import { PowerSyncDatabase } from "@powersync/react-native";
import { wrapPowerSyncWithDrizzle } from "@powersync/drizzle-driver";

import { AppSchema, drizzleSchema } from "./schema";

const dbName = "powersync.db";
const factory = new OPSqliteOpenFactory({ dbFilename: dbName });

export const powerSyncDb = new PowerSyncDatabase({
  schema: AppSchema,
  database: factory,
});

export const db = wrapPowerSyncWithDrizzle(powerSyncDb, {
  schema: drizzleSchema,
});
