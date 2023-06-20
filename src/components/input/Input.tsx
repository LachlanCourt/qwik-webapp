import { QwikJSX, component$, useContext } from "@builder.io/qwik";
import { FormControlContext } from "~/common/hooks/useForm/useForm";

import { InputStyle } from "~/theme/components.css";

export const Input = component$((props: QwikJSX.IntrinsicElements["input"]) => {
  const { handleChange, ...contextData } = useContext(FormControlContext);
  return (
    <input
      class={InputStyle}
      onInput$={handleChange}
      {...contextData}
      {...props}
    />
  );
});
