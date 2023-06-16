import { $, Signal } from "@builder.io/qwik";
import { useLocation } from "~/common/hooks/useLocation";

export const useCreateAPIToken = (
  tokenData: Signal<{ username?: string; password?: string }>
) => {
  const location = useLocation();

  const createToken = $(async (discriminator: string, webhookUrl: string) => {
    const result: { username?: string; password?: string } = await fetch(
      `${location.formPostUrl}/api/v1/admin/apitokens/new`,
      {
        method: "POST",
        body: JSON.stringify({ discriminator, webhookUrl }),
      }
    ).then((data) => (data.status == 200 ? data.json() : {}));

    tokenData.value = result;
  });

  return createToken;
};
