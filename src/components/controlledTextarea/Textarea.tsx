import { QRL, Signal, component$, $ } from "@builder.io/qwik";
import { FormControlContextType } from "~/common/hooks/useForm/useForm";
import { PopupState } from "./Popup";

interface TextareaProps {
  formContextData: FormControlContextType;
  className: string;
  handleChange: QRL<
    (e: Event, target: HTMLDivElement, isCalledByTask?: boolean) => void
  >;
  popupState: Signal<PopupState>;
  textareaRef: Signal<HTMLDivElement | undefined>;
}

export const Textarea = component$(
  ({
    formContextData,
    className,
    handleChange,
    popupState,
    textareaRef,
  }: TextareaProps) => {
    const closePopupOnClick = $(() => {
      popupState.value = { ...popupState.value, isVisible: false };
    });

    return (
      <div
        {...formContextData}
        ref={textareaRef}
        class={className}
        contentEditable={"true"}
        onInput$={handleChange}
        role={"textbox"}
        aria-multiline={"true"}
        key={"div"}
        onClick$={closePopupOnClick}
      />
    );
  }
);
