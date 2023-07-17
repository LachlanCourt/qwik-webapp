import {
  Signal,
  component$,
  $,
  type NoSerialize,
  QRL,
  useSignal,
  QwikKeyboardEvent,
} from "@builder.io/qwik";
import { theme } from "~/common/styles/theme.css";
import { OptionStyle } from "./popupstyle.css";

export interface OptionsType {
  name: string;
  value: string;
}

export interface Position {
  x: number;
  y: number;
  fromBottom?: boolean;
}
export interface PopupState {
  isVisible: boolean;
  position: Position;
  range: NoSerialize<Range | undefined>;
}

export interface PopupProps {
  state: Signal<PopupState>;
  options: Array<OptionsType>;
  processChange: QRL<() => Promise<void>>;
}

export const Popup = component$(
  ({ state, options, processChange }: PopupProps) => {
    const handleClick = $(async (value: string) => {
      const selection = window.getSelection();
      if (selection && state.value.range) {
        const originalValue = state.value.range?.endContainer.textContent;
        const trimmedValue = originalValue?.slice(0, originalValue.length - 2);
        state.value.range.endContainer.textContent = `${trimmedValue}${value} `;
        selection.removeAllRanges();
        state.value.range.setEndAfter(state.value.range.endContainer);
        state.value.range.collapse(false);
        selection.addRange(state.value.range);
        state.value = { ...state.value, isVisible: false };
        await processChange();
      }
    });

    // const renderCount = useSignal(0);

    // useVisibleTask$(async ({ track }) => {
    //   track(() => state.value);
    //   console.log("task");
    //   // renderCount.value++;
    //   // if (renderCount.value % 2 === 0)
    //   // if (handle.value === 1) {
    //   //   handle.value++;
    //   // }

    //   await processChange();
    // });

    const focussedOption = useSignal<number>(0);
    const optionIdentity = "select-option";

    const handleKeydown = $(
      (e: QwikKeyboardEvent<HTMLDivElement>, target: HTMLDivElement) => {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          let direction = e.key === "ArrowDown" ? 1 : -1;
          if (
            (focussedOption.value === 0 && direction < 0) ||
            (focussedOption.value === options.length - 1 && direction > 0)
          )
            direction = 0;
          focussedOption.value = focussedOption.value += direction;
          const optionElements = Array.from(target.childNodes).filter((node) =>
            node.nodeType !== Node.COMMENT_NODE
              ? (node as Element).getAttribute("data-identity") ===
                optionIdentity
              : false
          ) as Array<HTMLDivElement>;
          optionElements[focussedOption.value].focus({ preventScroll: true });
        } else if (e.key === "Enter") {
          handleClick(options[focussedOption.value].value);
        } else if (e.key === "Escape") {
          state.value = { ...state.value, isVisible: false };
        }
      }
    );

    return (
      <div
        style={{
          background: "#EEEEFF",
          position: "absolute",
          top: state.value.position.fromBottom
            ? ""
            : `${state.value.position.y}px`,
          bottom: state.value.position.fromBottom
            ? `${state.value.position.y}px`
            : "",
          left: state.value.position.fromBottom
            ? ""
            : `${state.value.position.x}px`,
          boxShadow: theme.boxShadow.md,
          borderRadius: theme.borderRadius.sm,
          padding: "0.6rem",
          marginBottom: state.value.position.fromBottom ? "1rem" : "",
          maxHeight: "100px",
          overflowY: "auto",
        }}
        window:onKeyDown$={handleKeydown}
      >
        <>
          {options.map((option, index) => (
            <div
              key={index}
              data-identity={optionIdentity}
              class={OptionStyle}
              preventdefault:blur
              preventdefault:click
              onClick$={$(() => handleClick(option.value))}
              tabIndex={-1}
            >
              {option.name}
            </div>
          ))}
        </>
      </div>
    );
  }
);
