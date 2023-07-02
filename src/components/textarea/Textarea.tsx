import { QwikJSX, component$, useContext, useComputed$, QRL, $ } from "@builder.io/qwik";
import { FormControlContext } from "~/common/hooks/useForm/useForm";

import { TextareaStyle } from "~/theme/components.css";

interface TextAreaProps {
  computeValue?: QRL<(text: string) => string>
}

export const Textarea = component$(
  (props: (QwikJSX.IntrinsicElements["textarea"] & TextAreaProps)) => {
    const { handleChange, ...contextData } = useContext(FormControlContext);
    // console.log('a', contextData)
    // const inputHandler = $(async (e: Event, target: HTMLTextAreaElement) => {
    //   let value: string = '';
    //   const { onInput$ } = props
    //   if (onInput$ && typeof onInput$ === 'function') value = await onInput$(e, target);
    //   const newTarget = { ...target, value: value || target.value }
    //   const newEvent = { ...e, target: newTarget }
    //   handleChange(newEvent, newTarget);
    // })
    // const { onInput$, ...rest } = props


    // const renderedValue = useComputed$(() => {
    //   console.log('hi')
    //   if (props.computeValue) {
    //     console.log('propfunc', contextData.signal.value.response)
    //     return props.computeValue(contextData.signal.value.response)
    //   }
    //   console.log('hello')
    //   return contextData.signal.value.response
    // })

    // const { value, ...rest } = contextData

    // console.log('value', value)
    // console.log('rendered value', renderedValue.value)
    return (
      <textarea
        class={TextareaStyle}
        onInput$={handleChange}
        // bind:value={renderedValue}
        // value={renderedValue.value}
        {...contextData}
        {...props}
      />
    );
  }
);
