import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "tailwind-variants";

import { Card, type CardRootProps } from "heroui-native/card";
import { TextField } from "heroui-native/text-field";
import { Label } from "heroui-native/label";
import { Input } from "heroui-native/input";
import { FieldError } from "heroui-native/field-error";
import { Button } from "heroui-native/button";

import {
  registerParamSchema,
  type RegisterParam,
} from "../schemas/register-param.schema";
import { Description } from "heroui-native/description";

interface RegisterFormProps extends CardRootProps {
  dhPublicKey: string;
  isSubmitting: boolean;
  handleFormSubmit: (data: RegisterParam) => void;
}

export function RegisterForm({
  className,
  dhPublicKey,
  isSubmitting,
  handleFormSubmit,
  ...props
}: RegisterFormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Omit<RegisterParam, "dhPublicKey">>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerParamSchema.omit({ dhPublicKey: true })),
  });

  const onSubmit = (data: Omit<RegisterParam, "dhPublicKey">) => {
    handleFormSubmit({ dhPublicKey, ...data });
  };

  return (
    <Card className={cn(className)} {...props}>
      <Card.Header>
        <Description className="text-2xl font-bold">Register Form</Description>
      </Card.Header>
      <Card.Body className="gap-y-4">
        <Controller
          control={control}
          name="name"
          render={({ field: { value, onBlur, onChange } }) => (
            <TextField isRequired isInvalid={errors.name ? true : false}>
              <Label>Name</Label>
              <Input
                value={value}
                placeholder="Enter name..."
                onChangeText={onChange}
                onBlur={onBlur}
              />
              <FieldError>{errors.name?.message}</FieldError>
            </TextField>
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { value, onBlur, onChange } }) => (
            <TextField isRequired isInvalid={errors.email ? true : false}>
              <Label>Email</Label>
              <Input
                value={value}
                placeholder="Enter email..."
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
              />
              <FieldError>{errors.email?.message}</FieldError>
            </TextField>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { value, onBlur, onChange } }) => (
            <TextField isRequired isInvalid={errors.password ? true : false}>
              <Label>Password</Label>
              <Input
                value={value}
                placeholder="Enter password..."
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
              />
              <FieldError>{errors.password?.message}</FieldError>
            </TextField>
          )}
        />

        <Button onPress={handleSubmit(onSubmit)} isDisabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Submit"}
        </Button>
      </Card.Body>
    </Card>
  );
}
