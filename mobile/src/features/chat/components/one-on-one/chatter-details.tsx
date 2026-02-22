import { Ionicons } from '@/components/icon';
import { ThrottledTouchable } from '@/components/throttled-touchable';
import { UserCollections } from '@/db/tanstack';
import { eq, useLiveSuspenseQuery } from '@tanstack/react-db';
import { router } from 'expo-router';
import { Avatar } from 'heroui-native/avatar';
import { Description } from 'heroui-native/description';
import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from 'tailwind-variants';

interface ChatterInfoProps extends ViewProps {
  userId: string;
}

export function ChatterInfo({ className, userId, ...props }: ChatterInfoProps) {
  const safeAreaInsets = useSafeAreaInsets();

  const { data } = useLiveSuspenseQuery((q) =>
    q
      .from({ user: UserCollections })
      .where(({ user }) => eq(user.id, userId))
      .findOne()
  );

  return (
    <View
      key={data?.id}
      className={cn(
        'justify border-background-tertiary flex-row items-center gap-x-1 border-b-2 p-2 px-4',
        className
      )}
      style={{ paddingTop: safeAreaInsets.top }}
      {...props}>
      <ThrottledTouchable className="bg-background rounded-full p-2" onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} />
      </ThrottledTouchable>

      <Avatar alt={data?.name ?? ''} className="size-14">
        <Avatar.Image />
        <Avatar.Fallback>{data?.name[0]}</Avatar.Fallback>
      </Avatar>

      <View className="flex-col">
        <View className="flex-row gap-x-2">
          <Description className="font-bold">{data?.name}</Description>
        </View>

        <Description>{data?.email}</Description>
      </View>
    </View>
  );
}
