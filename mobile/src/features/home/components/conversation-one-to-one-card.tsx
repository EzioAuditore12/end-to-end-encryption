import { Card, type CardRootProps } from "heroui-native/card";
import { Avatar } from "heroui-native/avatar";
import { Description } from "heroui-native/description";
import { View } from "react-native";

import { cn } from "tailwind-variants";
import {
  ThrottledTouchable,
  ThrottledTouchableProps,
} from "@/components/throttled-touchable";

interface ConversationOneToOneCardProps extends CardRootProps {
  data: {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    userName: string | undefined;
    userEmail: string | undefined;
  };
  onPress?: ThrottledTouchableProps["onPress"];
}

export function ConversationOneToOneCard({
  className,
  data,
  onPress,
  ...props
}: ConversationOneToOneCardProps) {
  const { id, userEmail, userName, createdAt, updatedAt } = data;

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <ThrottledTouchable onPress={onPress}>
      <Card key={id} className={cn(className)} {...props}>
        <Card.Body className="flex-row items-center gap-x-2">
          <Avatar alt={userName ?? ""} className="size-28">
            <Avatar.Image />
            <Avatar.Fallback>{userName?.[0]}</Avatar.Fallback>
          </Avatar>

          <View className="gap-y-2">
            <Description>Email: {userEmail}</Description>
            <Description>Created At: {formatTime(createdAt)}</Description>
            <Description>Updated At: {formatTime(updatedAt)}</Description>
          </View>
        </Card.Body>
      </Card>
    </ThrottledTouchable>
  );
}
