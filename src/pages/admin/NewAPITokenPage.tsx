import { component$, useSignal } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { useCreateAPIToken } from "./hooks/useCreateAPIToken";

const NewAPITokenPage = component$(() => {
  const tokenData = useSignal<{ username?: string; password?: string }>({});
  const createToken = useCreateAPIToken(tokenData);

  return (
    <>
      <button onClick$={createToken}>Generate</button>

      <div>
        API Key: {tokenData.value?.username || "Click button to generate"}
      </div>
      <div>
        API Pass: {tokenData.value?.password || "Click button to generate"}
      </div>
    </>
  );
});

export default NewAPITokenPage;
