import { component$, Slot } from "@builder.io/qwik";
import { CenterContainer, CenterWrapper } from "./style.css";

export const Center = component$(() => {
  return (
    <div class={CenterContainer}>
      <div class={CenterWrapper}>
        <Slot />
      </div>
    </div>
  );
});
