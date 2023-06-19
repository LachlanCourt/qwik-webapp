import { QwikJSX, Slot, component$ } from "@builder.io/qwik";
import { FormStyle } from "~/theme/components.css";

export const Form = component$((props: QwikJSX.IntrinsicElements["div"]) => {
  return (
    <div class={FormStyle} {...props}>
      <Slot />
    </div>
  );
});
