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
import { OptionsType, Popup, PopupState, Position } from "./Popup";
import { useChangeHandler } from "./useChangeHandler";

interface TextAreaProps {
  selectOptions: Array<OptionsType>;
}

export const ControlledTextarea = component$(
  ({ selectOptions }: TextAreaProps) => {
    const formContextData = useContext(FormControlContext);

    const popupState = useSignal<PopupState>({
      isVisible: false,
      position: { x: 0, y: 0 },
      range: noSerialize<Range | undefined>(undefined),
    });

    const handleChange = useChangeHandler(selectOptions, popupState);

    const self = useSignal<HTMLDivElement>();

    const processValue = $(async (isSSR = false) => {
      if (!self.value) return;
      if (isSSR) self.value.textContent = formContextData.value;
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
