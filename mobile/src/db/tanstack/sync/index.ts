import { createTransaction } from "@tanstack/react-db";
import { PowerSyncTransactor } from "@tanstack/powersync-db-collection";
import { createMMKV } from "react-native-mmkv";

import { db } from "@/db";

import {
  UserCollections,
  ChatOnetoOneCollections,
  ConversationOnetoOneCollections,
} from "../collections";
import { pullChangesApi } from "@/features/sync/api/pull-changes.api";

export const syncStorage = createMMKV({ id: "@tanstack-db/sync" });

export const resetSyncTimeStamp = () => syncStorage.set("lastPulledAt", 0);

export async function pullChanges() {
  let lastSyncedAt = syncStorage.getNumber("lastPulledAt");

  if (!lastSyncedAt) lastSyncedAt = 0;

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

  syncStorage.set("lastPulledAt", timestamp);
}
