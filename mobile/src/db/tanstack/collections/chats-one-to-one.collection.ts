import { powerSyncCollectionOptions } from "@tanstack/powersync-db-collection";
import { createCollection } from "@tanstack/react-db";

import { db } from "@/db";
import { AppSchema } from "@/db/schema";

import { chatOneToOneSchema } from "@/db/tables/chat-one-to-one.table";

export const ChatOnetoOneCollections = createCollection(
  powerSyncCollectionOptions({
    database: db,
    schema: chatOneToOneSchema,
    table: AppSchema.props.chat_one_to_one,
    onDeserializationError: (error) => {
      // Present fatal error
      console.log(error);
    },
  }),
);
