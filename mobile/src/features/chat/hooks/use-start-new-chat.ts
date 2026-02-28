import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { startNewChatApi } from '../api/start-new-chat.api';

import { getUserApi } from '@/features/common/api/get-user.api';

import { db } from '@/db';
import { userTable } from '@/db/tables/user.table';
import { conversationOneToOneTable } from '@/db/tables/conversation-one-to-one.table';
import { chatOneToOneTable } from '@/db/tables/chat-one-to-one.table';

export function useStartNewChat() {
  return useMutation({
    mutationFn: startNewChatApi,
    onSuccess: async (data) => {
      const userDetails = await getUserApi(data.receiverId);

      await db.transaction(async (transaction) => {
        await transaction.insert(userTable).values({
          ...userDetails,
          createdAt: new Date(userDetails.createdAt).getTime(),
          updatedAt: new Date(userDetails.updatedAt).getTime(),
        });

        await transaction.insert(conversationOneToOneTable).values({
          id: data.conversationId,
          userId: userDetails.id,
          createdAt: new Date(data.createdAt).getTime(),
          updatedAt: new Date(data.updatedAt).getTime(),
        });

        await transaction.insert(chatOneToOneTable).values({
          id: data.id,
          conversationId: data.conversationId,
          mode: 'SENT',
          status: 'DELIVERED',
          text: data.text,
          createdAt: new Date(data.createdAt).getTime(),
          updatedAt: new Date(data.updatedAt).getTime(),
        });
      });

      router.replace({
        pathname: '/(main)/chat/[id]',
        params: { id: data.conversationId, userId: data.receiverId },
      });
    },
    onError: (error) => {
      alert(error);
    },
  });
}
