import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { View } from "react-native";
import { Description } from "heroui-native/description";
import { Link } from "expo-router";

import { RegisterForm } from "@/features/auth/register/components/register-form";
import { useRegister } from "@/features/auth/register/hooks/use-register";
import { encryption } from "@/features/chat/encryption";

export default function RegisterScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { mutate, isPending } = useRegister();

  return (
    <KeyboardAwareScrollView
      style={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
      }}
      contentContainerClassName="flex-grow-1 items-center justify-center p-2"
    >
      <RegisterForm
        className="w-full max-w-2xl"
        handleFormSubmit={mutate}
        isSubmitting={isPending}
        dhPublicKey={encryption.generatePublicKey()}
      />

      <View className="flex-row items-center gap-x-1">
        <Description>Don&apos;t have an account</Description>
        <Link href={"/(auth)/login"} className="text-blue-500 underline">
          Login Here
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
}
