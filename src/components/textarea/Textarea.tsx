import { QwikJSX, component$, useContext, QRL } from "@builder.io/qwik";
import { FormControlContext } from "~/common/hooks/useForm/useForm";

import { TextareaStyle } from "~/theme/components.css";

interface TextAreaProps {
  computeValue?: QRL<(text: string) => string>;
}

export const Textarea = component$(
  (props: QwikJSX.IntrinsicElements["textarea"] & TextAreaProps) => {
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
