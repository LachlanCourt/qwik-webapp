import { Slot, component$ } from "@builder.io/qwik";
import { HeadingStyle } from "~/theme/components.css";

export const Heading = component$(() => {
  return (
    <div class={HeadingStyle}>
      <Slot />
    </div>
  );
});
