import { QwikJSX, component$ } from "@builder.io/qwik";

import { InputStyle } from "./style.css";

export const Input = component$((props: QwikJSX.IntrinsicElements["input"]) => {
  return <input class={InputStyle} {...props} />;
});
