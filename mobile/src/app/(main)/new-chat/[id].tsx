import { NewChatterInfo } from '@/features/chat/components/one-on-one/new-chatter-info';
import { SendNewMessage } from '@/features/chat/components/one-on-one/send-new-message';
import { useStartNewChat } from '@/features/chat/hooks/use-start-new-chat';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Description } from 'heroui-native/description';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewChattingScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { id, name } = useLocalSearchParams() as unknown as {
    id: string;
    name: string;
  };

  const { mutate } = useStartNewChat();

  return (
    <>
      <Stack.Screen
        options={{
          header: () => <NewChatterInfo style={{ paddingTop: safeAreaInsets.top }} name={name} />,
        }}
      />
      <View className="flex-1 p-2">
        <View className="flex-1 items-center justify-center">
          <Description className="text-2xl">Start chatting with {name}</Description>
        </View>
        <SendNewMessage receiverId={id} handleSubmit={mutate} />
      </View>
    </>
  );
}
