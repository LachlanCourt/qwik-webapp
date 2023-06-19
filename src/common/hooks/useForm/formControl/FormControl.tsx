import { QwikJSX, Slot, component$ } from "@builder.io/qwik";
import { FormControlHorizontalStyle, FormControlVerticalStyle } from "~/theme/components.css";

interface FormControlProps {
  isVertical?: boolean
}

export const FormControl = component$(
  (props: QwikJSX.IntrinsicElements["div"] & FormControlProps) => {
    const { isVertical = false } = props;
    return (
      <div class={isVertical ? FormControlVerticalStyle : FormControlHorizontalStyle} {...props}>
        <Slot />
      </div>
    );
  }
);
