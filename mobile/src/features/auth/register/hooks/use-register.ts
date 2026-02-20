import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { registerApi } from "../api/register.api";
import { useAuthStore } from "@/store/auth";
import { encryption } from "@/features/chat/encryption";

export function useRegister() {
  const { setTokens, setUser, setDhPrivateKey } = useAuthStore(
    (state) => state,
  );

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setTokens(data.tokens);

      setUser(data.user);

      setDhPrivateKey(encryption.generatePrivateKey());

      router.replace("/(main)");
    },
    onError: (error) => {
      alert(error);
    },
  });
}
