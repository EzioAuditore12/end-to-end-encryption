import { powerSyncCollectionOptions } from "@tanstack/powersync-db-collection";
import { createCollection } from "@tanstack/react-db";

import { db } from "@/db";
import { AppSchema } from "@/db/schema";

import { conversationOneToOneSchema } from "@/db/tables/conversation-one-to-one.table";

export const ConversationOnetoOneCollections = createCollection(
  powerSyncCollectionOptions({
    database: db,
    schema: conversationOneToOneSchema,
    table: AppSchema.props.conversation_one_to_one,
    onDeserializationError: (error) => {
      // Present fatal error
      console.log(error);
    },
  }),
);
