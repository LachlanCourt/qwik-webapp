import { $, Signal } from "@builder.io/qwik";
import { useLocation } from "~/common/hooks/useLocation";

export const useForgotPassword = (submitted: Signal<boolean>) => {
  const location = useLocation();

  const submitResetRequest = $(async (email: string) => {
    const body = new FormData();
    body.append("email", email);
    await fetch(`${location.formPostUrl}/api/v1/users/forgot`, {
      method: "POST",
      body,
    }).then(() => (submitted.value = true));
  });

  return submitResetRequest;
};
