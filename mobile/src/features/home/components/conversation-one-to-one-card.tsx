import { Card, type CardRootProps } from 'heroui-native/card';
import { Avatar } from 'heroui-native/avatar';
import { Description } from 'heroui-native/description';
import { View } from 'react-native';

import { cn } from 'tailwind-variants';
import { ThrottledTouchable, ThrottledTouchableProps } from '@/components/throttled-touchable';
import type { ConversationOneToOneJoinWithUser } from '@/db/tables/conversation-one-to-one.table';

interface ConversationOneToOneCardProps extends CardRootProps {
  data: ConversationOneToOneJoinWithUser;
  onPress?: ThrottledTouchableProps['onPress'];
}

export function ConversationOneToOneCard({
  className,
  data,
  onPress,
  ...props
}: ConversationOneToOneCardProps) {
  const { id, createdAt, updatedAt } = data.conversation_one_to_one;
  const userData = data.user;

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <ThrottledTouchable onPress={onPress}>
      <Card key={id} className={cn(className)} {...props}>
        <Card.Body className="flex-row items-center gap-x-2">
          <Avatar alt={userData?.name ?? ''} className="size-28">
            <Avatar.Image />
            <Avatar.Fallback>{userData?.name[0]}</Avatar.Fallback>
          </Avatar>

          <View className="gap-y-2">
            <Description>Email: {userData?.email}</Description>
            <Description>Created At: {formatTime(new Date(createdAt))}</Description>
            <Description>Updated At: {formatTime(new Date(updatedAt))}</Description>
          </View>
        </Card.Body>
      </Card>
    </ThrottledTouchable>
  );
}
