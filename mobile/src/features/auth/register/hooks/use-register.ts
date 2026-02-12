import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { registerApi } from "../api/register.api";
import { useAuthStore } from "@/store/auth";

export function useRegister() {
  const { setTokens, setUser } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      setTokens(data.tokens);

      setUser(data.user);

      router.replace("/(main)");
    },
    onError: (error) => {
      alert(error);
    },
  });
}
