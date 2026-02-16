import { Card, CardRootProps } from "heroui-native/card";

import type { User } from "../schemas/user.schema";

import { Description } from "heroui-native/description";
import { cn } from "tailwind-variants";
import { Avatar } from "heroui-native/avatar";
import { View } from "react-native";

import {
  ThrottledTouchable,
  type ThrottledTouchableProps,
} from "@/components/throttled-touchable";

interface UserCardProps extends CardRootProps {
  data: User;
  onPress: ThrottledTouchableProps["onPress"];
}

export function UserCard({
  className,
  onPress,
  data,
  ...props
}: UserCardProps) {
  const { id, name, email, createdAt, updatedAt } = data;

  return (
    <ThrottledTouchable onPress={onPress}>
      <Card key={id} className={cn(className)} {...props}>
        <Card.Body className="gap-x-2 flex-row items-center">
          <Avatar alt={name} className="size-28">
            <Avatar.Image />
            <Avatar.Fallback>{name[0]}</Avatar.Fallback>
          </Avatar>

          <View>
            <Description className="font-bold">Name: {name}</Description>
            <Description className="font-bold">Email: {email}</Description>
            <Description className="font-bold">
              Created At: {new Date(createdAt).toDateString()}
            </Description>
            <Description className="font-bold">
              Updated At: {new Date(updatedAt).toDateString()}
            </Description>
          </View>
        </Card.Body>
      </Card>
    </ThrottledTouchable>
  );
}
