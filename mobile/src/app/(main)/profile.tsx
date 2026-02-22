import { Description } from 'heroui-native/description';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UserProfileCard } from '@/features/common/components/user-profile-card';
import { useGetUserProfile } from '@/features/common/hooks/use-get-user-profile';

export default function ProfileScreen() {
  const { data, isLoading, error } = useGetUserProfile();

  const safeAreaInsets = useSafeAreaInsets();

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
    </ScrollView>
  );
}
