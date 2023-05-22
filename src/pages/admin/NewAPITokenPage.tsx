import { component$, useSignal, $, QwikKeyboardEvent } from "@builder.io/qwik";
import { useCreateAPIToken } from "./hooks/useCreateAPIToken";
import { Button } from "~/components/button";

const NewAPITokenPage = component$(() => {
  const tokenData = useSignal<{ username?: string; password?: string }>({});
  const inputValue = useSignal("");
  const errorMessage = useSignal("");
  const createToken = useCreateAPIToken(tokenData);

  const handleSumbit = $(() => {
    if (inputValue.value) {
      createToken(inputValue.value);
    } else {
      errorMessage.value = "Discriminator is required";
    }
  });

  const handleEnterKeyDown = $((e: QwikKeyboardEvent<HTMLButtonElement>) => {
    e.key === "Enter" && handleSumbit();
  });

  const handleInput = $((e: Event, target: HTMLInputElement) => {
    inputValue.value = target.value;
    if (target.value) errorMessage.value = "";
  });

  return (
    <>
      <Button label="Back" link="/admin/apitokens" />
      Discriminator:
      <input value={inputValue.value} onInput$={handleInput} />
      {errorMessage}
      <button onClick$={handleSumbit} window:onKeyDown$={handleEnterKeyDown}>
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
