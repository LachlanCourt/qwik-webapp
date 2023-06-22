import { QwikJSX, component$, useContext } from "@builder.io/qwik";
import { FormControlContext } from "~/common/hooks/useForm/useForm";

import { TextareaStyle } from "~/theme/components.css";

export const Textarea = component$(
  (props: QwikJSX.IntrinsicElements["textarea"]) => {
    const { handleChange, ...contextData } = useContext(FormControlContext);
    return (
      <textarea
        class={TextareaStyle}
        onInput$={handleChange}
        {...contextData}
        {...props}
      />
    );
  }
);
