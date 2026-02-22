import { Stack, useLocalSearchParams } from 'expo-router';
import { Avatar } from 'heroui-native/avatar';
import { Description } from 'heroui-native/description';
import { View } from 'react-native';

export default function NewChattingScreen() {
  const { id, name } = useLocalSearchParams() as unknown as {
    id: string;
    name: string;
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <View className="flex-row gap-x-2 p-2">
              <Avatar alt={name}>
                <Avatar.Image />
                <Avatar.Fallback>{name[0]}</Avatar.Fallback>
              </Avatar>
              <Description>{name}</Description>
            </View>
          ),
        }}
      />
      <View className="flex-1 items-center justify-center">
        <Description>{id}</Description>
      </View>
    </>
  );
}
