import { OPSqliteOpenFactory } from '@powersync/op-sqlite';
import { PowerSyncDatabase } from '@powersync/react-native';

import { AppSchema } from './schema';

const dbName = 'powersync.db';
const factory = new OPSqliteOpenFactory({ dbFilename: dbName });

export const db = new PowerSyncDatabase({
  schema: AppSchema,

  database: factory,
});
