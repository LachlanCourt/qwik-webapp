import { component$, useSignal, $, QwikKeyboardEvent } from "@builder.io/qwik";
import { useCreateAPIToken } from "./hooks/useCreateAPIToken";
import { Button } from "~/components/button";

const NewAPITokenPage = component$(() => {
  const tokenData = useSignal<{ username?: string; password?: string }>({});
  const discriminatorValue = useSignal("");
  const webhookValue = useSignal("");
  const errorMessage = useSignal("");
  const createToken = useCreateAPIToken(tokenData);

  const handleSumbit = $(() => {
    if (discriminatorValue.value) {
      createToken(discriminatorValue.value, webhookValue.value);
    } else {
      errorMessage.value = "Discriminator is required";
    }
  });

  const handleEnterKeyDown = $((e: QwikKeyboardEvent<HTMLButtonElement>) => {
    e.key === "Enter" && handleSumbit();
  });

  const handleDiscriminatorInput = $((e: Event, target: HTMLInputElement) => {
    discriminatorValue.value = target.value;
    if (target.value) errorMessage.value = "";
  });
  const handleWebhookInput = $((e: Event, target: HTMLInputElement) => {
    webhookValue.value = target.value;
  });

  return (
    <>
      <Button label="Back" link="/admin/apitokens" />
      Discriminator:
      <input
        value={discriminatorValue.value}
        onInput$={handleDiscriminatorInput}
        disabled={!!tokenData.value.username}
      />
      {errorMessage}
      Webhook URL:
      <input
        value={webhookValue.value}
        onInput$={handleWebhookInput}
        disabled={!!tokenData.value.username}
      />
      <button
        onClick$={handleSumbit}
        window:onKeyDown$={handleEnterKeyDown}
        disabled={!!tokenData.value.username}
      >
        Generate
      </button>
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
