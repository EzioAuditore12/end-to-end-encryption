import { createTransaction } from "@tanstack/react-db";
import { PowerSyncTransactor } from "@tanstack/powersync-db-collection";

import { db } from "@/db";

import {
  UserCollections,
  ChatOnetoOneCollections,
  ConversationOnetoOneCollections,
} from "../collections";
import { pullChangesApi } from "@/features/sync/api/pull-changes.api";
import { useDeviceStore } from "@/store/device";

export async function pullChanges() {
  const lastSyncedAt = useDeviceStore.getState().lastSyncedAt;

  const { changes, timestamp } = await pullChangesApi({
    lastSyncedAt,
    tableNames: ["CHAT-ONE-TO-ONE", "CONVERSATION-ONE-TO-ONE", "USER"],
  });

  const batchTx = createTransaction({
    autoCommit: false,
    mutationFn: async ({ transaction }) => {
      await new PowerSyncTransactor({ database: db }).applyTransaction(
        transaction,
      );
    },
  });

  batchTx.mutate(() => {
    UserCollections.insert(changes.user.created);
    ConversationOnetoOneCollections.insert(
      changes.conversationOneToOne.created,
    );
    ChatOnetoOneCollections.insert(changes.chatsOneToOne.created);
  });

  await batchTx.commit();

  useDeviceStore.getState().updateLastSynedAt(timestamp);
}
