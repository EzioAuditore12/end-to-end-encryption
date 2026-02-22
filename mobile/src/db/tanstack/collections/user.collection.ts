import { powerSyncCollectionOptions } from '@tanstack/powersync-db-collection';
import { createCollection } from '@tanstack/react-db';

import { db } from '@/db';
import { AppSchema } from '@/db/schema';

import { userSchema } from '@/db/tables/user.table';

export const UserCollections = createCollection(
  powerSyncCollectionOptions({
    database: db,
    schema: userSchema,
    table: AppSchema.props.user,
    onDeserializationError: (error) => {
      // Present fatal error
      console.log(error);
    },
  })
);
