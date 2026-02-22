import { Link } from 'expo-router';
import { Button } from 'heroui-native/button';
import { Description } from 'heroui-native/description';
import { View, ViewProps } from 'react-native';
import { cn } from 'tailwind-variants';

import { useAuthStore } from '@/store/auth';

export function HomeHeader({ className, ...props }: ViewProps) {
  const { logout } = useAuthStore((state) => state);

  return (
    <View className={cn('flex-row items-center justify-between p-2', className)} {...props}>
      <Description>End To End</Description>

      <View className="flex-row items-center gap-x-2">
        <Link className="text-foreground mr-2" href={'/(main)/search'}>
          Search
        </Link>
        <Link className="text-foreground mr-2" href={'/(main)/profile'}>
          Profile
        </Link>
        <Button variant="danger" onPress={logout}>
          Logout
        </Button>
      </View>
    </View>
  );
}
