import { type } from 'arktype';

import { tableNames } from '../table-names.schema';

export const pullChangesParamSchema = type({
  lastSyncedAt: 'number',
  tableNames: tableNames,
});

export type PullChangesParam = typeof pullChangesParamSchema.infer;
