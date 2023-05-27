import { $, Signal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const useCreateAPIToken = (
  tokenData: Signal<{ username?: string; password?: string }>
) => {
  const location = useLocation();

  const createToken = $(async (discriminator: string, webhookUrl: string) => {
    const result: { username?: string; password?: string } = await fetch(
      `${location.url.origin}/api/v1/admin/apitokens/new`,
      {
        method: "POST",
        body: JSON.stringify({ discriminator, webhookUrl }),
      }
    ).then((data) => (data.status == 200 ? data.json() : {}));

    tokenData.value = result;
  });

  return createToken;
};
