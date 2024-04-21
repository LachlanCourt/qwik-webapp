import {
  component$,
  useContext,
  $,
  useSignal,
  useVisibleTask$,
  noSerialize,
} from "@builder.io/qwik";
import { FormControlContext } from "~/common/hooks/useForm/useForm";
import { TextareaStyle } from "~/theme/components.css";
import { Textarea } from "./Textarea";
import { OptionsType, Popup, PopupState } from "./Popup";
import { useChangeHandler } from "./useChangeHandler";

interface TextAreaProps {
  selectOptions: Array<OptionsType>;
  index: number;
}

export const ControlledTextarea = component$(
  ({ selectOptions, index }: TextAreaProps) => {
    const formContextData = useContext(FormControlContext);
    const formValue =
      typeof formContextData.value === "string"
        ? formContextData.value
        : formContextData.value.value;

    const popupState = useSignal<PopupState>({
      isVisible: false,
      position: { x: 0, y: 0 },
      range: noSerialize<Range | undefined>(undefined),
    });

    const handleChange = useChangeHandler(selectOptions, popupState);

    const self = useSignal<HTMLDivElement>();

    const processValue = $(async (isSSR = false) => {
      if (!self.value) return;
      if (isSSR) self.value.textContent = formValue;
      await handleChange(new Event("", undefined), self.value, isSSR);
    });

    useVisibleTask$(async () => {
      await processValue(true);
    });

    return (
      <>
        <Textarea
          textareaRef={self}
          formContextData={formContextData}
          className={TextareaStyle}
          handleChange={handleChange}
          popupState={popupState}
        />
        {popupState.value.isVisible && (
          <Popup
            state={popupState}
            options={selectOptions}
            processChange={processValue}
          />
        )}
      </>
    );
  }
);
