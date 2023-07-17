import {
  component$,
  useContext,
  $,
  useSignal,
  useVisibleTask$,
  QwikChangeEvent,
  Component,
  useTask$,
  noSerialize,
} from "@builder.io/qwik";
import { FormControlContext } from "~/common/hooks/useForm/useForm";
import {
  TextareaStyle,
  ButtonBaseStyle,
  ButtonStyleVariants,
  InlineButtonMarginStyle,
} from "~/theme/components.css";
import { Textarea } from "./Textarea";
import { OptionsType, Popup, PopupProps, PopupState } from "./Popup";

interface TextAreaProps {
  selectOptions: Array<OptionsType>;
}

export const ControlledTextarea = component$(
  ({ selectOptions }: TextAreaProps) => {
    const formContextData = useContext(FormControlContext);

    const internalData = useSignal<{ [key: string]: string }>({});
    const popupState = useSignal<PopupState>({
      isVisible: false,
      position: { x: 0, y: 0 },
      range: noSerialize<Range | undefined>(undefined),
    });
    const PopupContainer = useSignal<Component<PopupProps>>(
      component$(() => <div />)
    );

    const handleChange = $(
      (e: Event, target: HTMLDivElement, isCalledByTask = false) => {
        let newValue = "";
        target.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            newValue += node.textContent;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.nodeName === "BUTTON") {
              const dataId: string =
                (node as Element).getAttribute("data-id") || "";
              newValue += internalData.value[dataId] || "";
            } else {
              newValue += node.textContent || "";
              (node as Element).outerHTML = node.textContent || "";
            }
          }
        });
        formContextData.handleChange(null, null, newValue);

        const selection = window.getSelection();
        if (!selection) return;

        const range = isCalledByTask ? null : selection.getRangeAt(0);
        let buttonNode = null;
        const traverseNodes = (node: ChildNode) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent || "";
            const regex = /{{[^}]*}}/g;
            const parts = text.split(regex);
            const content = [...text.matchAll(regex)];

            if (parts.length > 1) {
              const fragment = document.createDocumentFragment();

              parts.forEach((part, index) => {
                if (part) {
                  const textNode = document.createTextNode(part);
                  fragment.appendChild(textNode);
                }

                if (index < parts.length - 1) {
                  const button = document.createElement("button");

                  button.textContent = "Click Me";
                  button.contentEditable = "false";
                  button.className = `${ButtonBaseStyle} ${ButtonStyleVariants.primary} ${InlineButtonMarginStyle}`;
                  const newId = crypto.randomUUID();
                  internalData.value = {
                    ...internalData.value,
                    [newId]: content[0][0],
                  };
                  content.splice(0, 1);
                  button.setAttribute("data-id", newId);
                  fragment.appendChild(button);
                  buttonNode = button;
                }
              });

              const parentNode = node.parentNode;
              if (parentNode) {
                parentNode.replaceChild(fragment, node);
              }
            }
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (const childNode of node.childNodes) {
              traverseNodes(childNode);
            }
          }
        };
        traverseNodes(target);

        if (range) {
          // Set caret position after the inserted content
          if (buttonNode) {
            const newRange = document.createRange();
            newRange.setStartAfter(buttonNode);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          } else {
            // If no button was inserted, restore the original caret position
            selection.removeAllRanges();
            selection.addRange(range);
          }

          if (
            range.endContainer.nodeValue?.endsWith("{{") &&
            range.endOffset === range.endContainer.nodeValue?.length
          ) {
            const { x, y } = range.getBoundingClientRect();

            const position = { x, y };
            popupState.value = {
              ...popupState.value,
              isVisible: true,
              position,
              range: noSerialize<Range | undefined>(range),
            };
          } else
            popupState.value = {
              ...popupState.value,
              isVisible: false,
              range: undefined,
            };
        }
      }
    );

    const processValue = $(async () => {
      const self = document.getElementById(
        formContextData.id
      ) as HTMLDivElement | null;
      if (!self) return;
      self.textContent = formContextData.value;
      await handleChange(new Event("", undefined), self, true);
    });

    useVisibleTask$(async () => {
      await processValue();
    });

    const handleSelectionChange = $(
      async (
        e: QwikChangeEvent<HTMLSelectElement>,
        target: HTMLSelectElement
      ) => {
        // debugger;
        // const selection = window.getSelection();
        // const fragment = document.createDocumentFragment();
        // fragment.textContent = target.value + " ";
        // const self = document.getElementById(
        //   formContextData.id
        // ) as HTMLDivElement | null;
        // if (!self) return;
        // if (selection && selection.rangeCount > 0) {
        //   const range = selection.getRangeAt(0);
        //   console.log(selection);
        //   console.log(range);
        //   if (
        //     range.commonAncestorContainer.parentElement?.attributes["id" as any]
        //       .value === formContextData.id
        //   ) {
        //     range.insertNode(fragment);
        //   }
        // } else {
        //   document.getElementById(formContextData.id)?.appendChild(fragment);
        // }
        // await handleChange(new Event("", undefined), self, true);
        // target.value = "default";
      }
    );

    // const popup = component$(() => {
    //   return <div>HI</div>;
    // });

    useTask$(async ({ track }) => {
      track(() => popupState.value);

      if (popupState.value.isVisible) {
        PopupContainer.value = Popup;
      } else {
        PopupContainer.value = component$(() => {
          return null;
        });
      }
    });

    return (
      <>
        <Textarea
          formContextData={formContextData}
          className={TextareaStyle}
          handleChange={handleChange}
          popupState={popupState}
        />
        <PopupContainer.value
          state={popupState}
          options={selectOptions}
          processChange={processValue}
        />
        {/* {selectOptions && showPopup.value && (
          <select key={"select"} onChange$={handleSelectionChange}>
            <option key="initial" disabled selected hidden value="default">
              Select a dynamic value to be inserted
            </option>
            {selectOptions.map((selectOption, index) => {
              return (
                <option key={index} value={selectOption.value}>
                  {selectOption.name}
                </option>
              );
            })}
          </select>
        )} */}
      </>
    );
  }
);
