import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

import { loginApi } from "../api/login.api";
import { useAuthStore } from "@/store/auth";

export function useLogin() {
  const { setTokens, setUser } = useAuthStore((state) => state);

  return useMutation({
    mutationFn: loginApi,
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
