import { View } from 'react-native';
import { Description } from 'heroui-native/description';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useStartNewChat } from '@/features/chat/hooks/use-start-new-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NewChatterInfo } from '@/features/chat/components/one-on-one/new-chatter-info';
import { SendNewMessage } from '@/features/chat/components/one-on-one/send-new-message';

export default function NewChattingScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { id, name } = useLocalSearchParams() as unknown as { id: string; name: string };

  const { mutate } = useStartNewChat();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <NewChatterInfo style={{ paddingTop: safeAreaInsets.top }} name={name} />,
        }}
      />
      <View className="flex-1">
        <View className="flex-1 items-center justify-center p-2">
          <Description>Start Chatting with {name}</Description>
        </View>
        <SendNewMessage receiverId={id} handleSubmit={mutate} />
      </View>
    </>
  );
}
