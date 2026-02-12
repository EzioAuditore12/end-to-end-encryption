import { Card, CardRootProps } from "heroui-native/card";

import type { User } from "../schemas/user.schema";

import { Description } from "heroui-native/description";
import { cn } from "tailwind-variants";
import { Avatar } from "heroui-native/avatar";

interface UserProfileCardProps extends CardRootProps {
  data: User | undefined;
}

export function UserProfileCard({
  className,
  data,
  ...props
}: UserProfileCardProps) {
  if (!data) return <Description>Nothing to show</Description>;

  const { id, name, email, createdAt, updatedAt } = data;

  return (
    <Card key={id} className={cn(className)} {...props}>
      <Card.Header className="justify-center items-center">
        <Avatar alt={name} className="size-28">
          <Avatar.Image />
          <Avatar.Fallback>{name[0]}</Avatar.Fallback>
        </Avatar>
      </Card.Header>
      <Card.Body className="gap-y-2">
        <Description className="font-bold">Name: {name}</Description>
        <Description className="font-bold">Email: {email}</Description>
        <Description className="font-bold">Created At: {createdAt}</Description>
        <Description className="font-bold">Updated At: {updatedAt}</Description>
      </Card.Body>
    </Card>
  );
}
