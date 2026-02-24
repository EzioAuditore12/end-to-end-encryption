import { db } from '@/db';

import { pullChangesApi } from '@/features/sync/api/pull-changes.api';
import { useDeviceStore } from '@/store/device';
import { userTable } from '@/db/tables/user.table';
import { conversationOneToOneTable } from '@/db/tables/conversation-one-to-one.table';
import { chatOneToOneTable } from '@/db/tables/chat-one-to-one.table';

export async function pullChanges() {
  const lastSyncedAt = useDeviceStore.getState().lastSyncedAt;

  const { changes, timestamp } = await pullChangesApi({
    lastSyncedAt,
    tableNames: ['CHAT-ONE-TO-ONE', 'CONVERSATION-ONE-TO-ONE', 'USER'],
  });

  await db.insert(userTable).values(changes.user.created);
  await db.insert(conversationOneToOneTable).values(changes.conversationOneToOne.created);
  await db.insert(chatOneToOneTable).values(changes.chatsOneToOne.created);

  useDeviceStore.getState().updateLastSynedAt(timestamp);
}
