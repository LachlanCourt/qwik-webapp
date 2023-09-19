import {
  $,
  Signal,
  noSerialize,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import {
  FormControlContext,
  FormControlContextType,
} from "~/common/hooks/useForm/useForm";
import { OptionsType, PopupState, Position } from "./Popup";
import {
  TextareaStyle,
  ButtonBaseStyle,
  ButtonStyleVariants,
  InlineButtonMarginStyle,
} from "~/theme/components.css";
import { GlobalContext } from "~/root";
import { EditModalContent } from "./EditModalContent";
export const useChangeHandler = (
  selectOptions: Array<OptionsType>,
  popupState: Signal<PopupState>
) => {
  const globalContext = useContext(GlobalContext);
  const formContextData = useContext(FormControlContext);
  const internalData = useSignal<{ [key: string]: string }>({});

  const calculateAndPropagateValue = $((target: HTMLDivElement) => {
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
  });

  const setCaratToEndAndOpenPopup = $(
    (
      buttonNode: HTMLButtonElement | null,
      selection: Selection,
      range: Range
    ) => {
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
        let position: Position = { x: 0, y: 0 };
        if (!window.matchMedia("(max-width: 450px)").matches) {
          // Desktop
          const { x, y } = range.getBoundingClientRect();
          position = { x, y };
        } else {
          // Mobile
          position = {
            ...position,
            fromBottom: true,
          };
        }
        popupState.value = {
          ...popupState.value,
          isVisible: true,
          position,
          range: noSerialize<Range | undefined>(range),
        };
      } else {
        popupState.value = {
          ...popupState.value,
          isVisible: false,
          range: undefined,
        };
      }
    }
  );

  const handleChange = $(
    async (e: Event, target: HTMLDivElement, isSSR = false) => {
      await calculateAndPropagateValue(target);

      let selection: Selection | null = null;
      let range: Range | null = null;

      if (!isSSR) {
        selection = window.getSelection();
        if (!selection) return;
        range = isSSR ? null : selection.getRangeAt(0);
      }

      const getPatternSignature = (pattern: string) => {
        return pattern.split(/:/).slice(0, 2).join(":");
      };

      const getInterpolationValue = (value: string) => {
        return value
          .slice(2, value.length - 2)
          .split(/:/)
          .slice(2);
      };

      //TODO see if we can get this pulled out of the handleChange function properly - serialisation errors
      // const buttonNode = await replaceInterpolationWithButtons(target, target);
      let buttonNode: HTMLButtonElement | null = null;

      const replaceInterpolationWithButtons = (node: ChildNode) => {
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
                const valueOfReplacementPart = content[0][0];
                const option = selectOptions.find(
                  (option) =>
                    getPatternSignature(option.value) ===
                    getPatternSignature(valueOfReplacementPart)
                );
                const button = document.createElement("button");

                button.textContent = option?.buttonLabel || "";
                button.contentEditable = "false";
                button.className = `${ButtonBaseStyle} ${ButtonStyleVariants.primary} ${InlineButtonMarginStyle}`;

                button.onclick = (e) => {
                  const dataId: string =
                    (e.target as Element).getAttribute("data-id") || "";
                  const internalDataValue = internalData.value[dataId] || "";
                  const formValue =
                    internalDataValue === option?.pattern &&
                    option.variableSchema
                      ? option.variableSchema.map((vs) => vs.defaultValue)
                      : getInterpolationValue(internalDataValue);
                  globalContext.modalContent = noSerialize(() => (
                    <EditModalContent
                      option={option}
                      onSubmit$={$(async (data: Array<string>) => {
                        let newValue = option?.pattern || "";
                        option?.variableSchema?.forEach((variable, index) => {
                          newValue = newValue.replace(
                            new RegExp(variable.value),
                            data[index]
                          );
                        });
                        internalData.value[dataId] = newValue;
                        globalContext.modal.value.close();
                        await calculateAndPropagateValue(target);
                      })}
                      dataValue={formValue}
                    />
                  ));
                  globalContext.modal.value.show();
                };

                const newId = crypto.randomUUID();
                internalData.value = {
                  ...internalData.value,
                  [newId]: valueOfReplacementPart,
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
            replaceInterpolationWithButtons(childNode);
          }
        }
      };

      replaceInterpolationWithButtons(target);

      if (range && selection) {
        await setCaratToEndAndOpenPopup(buttonNode, selection, range);
      }
    }
  );

  return handleChange;
};
