import { useLocalSearchParams } from "expo-router";
import { Description } from "heroui-native/description";
import { View } from "react-native";

export default function NewChattingScreen() {
  const { id } = useLocalSearchParams() as unknown as { id: string };

  return (
    <View className="flex-1 justify-center items-center">
      <Description>{id}</Description>
    </View>
  );
}
