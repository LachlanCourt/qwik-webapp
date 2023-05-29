import { QwikJSX, Slot, component$ } from "@builder.io/qwik";
import { FormControlStyle } from "./style.css";

export const FormControl = component$(
  (props: QwikJSX.IntrinsicElements["div"]) => {
    return (
      <div class={FormControlStyle} {...props}>
        <Slot />
      </div>
    );
  }
);
