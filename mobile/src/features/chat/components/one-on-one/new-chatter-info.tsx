import { Ionicons } from '@/components/icon';
import { ThrottledTouchable } from '@/components/throttled-touchable';
import { router } from 'expo-router';
import { Avatar } from 'heroui-native/avatar';
import { Description } from 'heroui-native/description';
import { View, type ViewProps } from 'react-native';
import { cn } from 'tailwind-variants';

interface NewChatterInfoProps extends ViewProps {
  name: string;
}

export function NewChatterInfo({ className, name, ...props }: NewChatterInfoProps) {
  return (
    <View className="flex-row items-center gap-x-2 p-2" {...props}>
      <ThrottledTouchable
        className={cn('bg-background rounded-full p-2', className)}
        onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={22} />
      </ThrottledTouchable>

      <Avatar className="size-14" alt={name}>
        <Avatar.Image />
        <Avatar.Fallback>{name[0]}</Avatar.Fallback>
      </Avatar>
      <Description>{name}</Description>
    </View>
  );
}
