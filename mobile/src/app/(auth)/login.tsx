import { View } from "react-native";
import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { Description } from "heroui-native/description";

import { LoginForm } from "@/features/auth/login/components/login-form";
import { useLogin } from "@/features/auth/login/hooks/use-login";

export default function LoginScreen() {
  const safeAreaInsets = useSafeAreaInsets();

  const { mutate, isPending } = useLogin();
  return (
    <KeyboardAwareScrollView
      style={{
        paddingTop: safeAreaInsets.top,
        paddingBottom: safeAreaInsets.bottom,
      }}
      contentContainerClassName="flex-grow-1 items-center justify-center p-2"
    >
      <LoginForm
        className="w-full max-w-xl"
        handleFormSubmit={mutate}
        isSubmitting={isPending}
      />

      <View className="flex-row items-center gap-x-1">
        <Description>Don&apos;t have an account</Description>
        <Link href={"/register"} className="text-blue-500 underline">
          Register Here
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
}
