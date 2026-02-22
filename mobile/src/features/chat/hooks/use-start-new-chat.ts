import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { startNewChatApi } from '../api/start-new-chat.api';
import { getUserApi } from '@/features/common/api/get-user.api';
import {
  ChatOnetoOneCollections,
  ConversationOnetoOneCollections,
  UserCollections,
} from '@/db/tanstack';

export function useStartNewChat() {
  return useMutation({
    mutationFn: startNewChatApi,
    onSuccess: async (data) => {
      console.log(data.receiverId);

      const userDetails = await getUserApi(data.receiverId);

      console.log(userDetails);

      UserCollections.insert({
        ...userDetails,
        createdAt: new Date(userDetails.createdAt).getTime(),
        updatedAt: new Date(userDetails.updatedAt).getTime(),
      });

      ConversationOnetoOneCollections.insert({
        id: data.conversationId,
        userId: data.receiverId,
        createdAt: new Date(data.createdAt).getTime(),
        updatedAt: new Date(data.updatedAt).getTime(),
      });

      ChatOnetoOneCollections.insert({
        id: data.id,
        conversationId: data.conversationId,
        mode: 'SENT',
        status: 'SENT',
        text: data.text,
        createdAt: new Date(data.createdAt).getTime(),
        updatedAt: new Date(data.updatedAt).getTime(),
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
