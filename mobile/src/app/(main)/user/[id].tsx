import { router, useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Description } from 'heroui-native/description';
import { Button } from 'heroui-native/button';

import { useGetUser } from '@/features/common/hooks/use-get-user';

import { useRefreshOnFocus } from '@/hooks/use-refresh-on-focus';
import { UserProfileCard } from '@/features/common/components/user-profile-card';
import { conversationOneToOneRepository } from '@/db/repositories/conversation-one-to-one.repository';

const navigateToChat = async ({ userId, userName }: { userId: string; userName: string }) => {
  const existingConversationWithUser = await conversationOneToOneRepository.getByUserId(userId);

  router.dismissTo('/(main)');

  if (existingConversationWithUser) {
    router.navigate({
      pathname: '/(main)/chat/[id]',
      params: {
        id: existingConversationWithUser.id,
        userId: existingConversationWithUser.userId,
      },
    });
    return;
  }

  router.navigate({
    pathname: '/(main)/new-chat/[id]',
    params: {
      id: userId,
      name: userName,
    },
  });
};

export default function UserDetails() {
  const safeAreaInsets = useSafeAreaInsets();

  const { id } = useLocalSearchParams() as unknown as { id: string };

  const { data, refetch, isLoading, error } = useGetUser(id);

  useRefreshOnFocus(refetch);
  if (error)
    return (
      <View className="flex-1 items-center justify-center">
        <Description>{error.message}</Description>
      </View>
    );

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <Description>Data is being loaded ...</Description>
      </View>
    );
  return (
    <ScrollView
      style={{ marginTop: safeAreaInsets.top }}
      contentContainerClassName="flex-grow-1 items-center justify-center gap-y-2 p-2">
      <UserProfileCard className="w-full max-w-4xl" data={data} />
      <Button
        onPress={async () =>
          await navigateToChat({ userId: data?.id as string, userName: data?.name as string })
        }>
        Start Chatting
      </Button>
    </ScrollView>
  );
}
