import { $, Signal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export const useCreateAPIToken = (
  tokenData: Signal<{ username?: string; password?: string }>
) => {
  const location = useLocation();

  const createToken = $(async () => {
    const result: { username?: string; password?: string } = await fetch(
      `${location.url.origin}/api/v1/admin/apitokens/new`,
      {
        method: "POST",
      }
    ).then((data) => (data.status == 200 ? data.json() : {}));
    if (tokenData.value) {
      tokenData.value = result;
    }
  });

  return createToken;
};
