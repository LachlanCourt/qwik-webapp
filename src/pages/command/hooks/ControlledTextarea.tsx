import { component$, useContext, $, useSignal } from "@builder.io/qwik";
import { FormControlContext } from "~/common/hooks/useForm/useForm";
import {
  TextareaStyle,
  ButtonBaseStyle,
  ButtonStyleVariants,
} from "~/theme/components.css";

export const ControlledTextarea = component$(() => {
  const formContextData = useContext(FormControlContext);

  const internalData = useSignal<{ [key: string]: string }>({});

  const handleChange = $((e: Event, target: HTMLDivElement) => {
    let newValue = "";
    target.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        newValue += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.nodeName === "BUTTON") {
          const dataId: string = (node as Element).attributes["data-id" as any]
            .value;
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

    const range = selection.getRangeAt(0);
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
              button.className = `${ButtonBaseStyle} ${ButtonStyleVariants.primary}`;
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
  });

  return (
    <div
      class={TextareaStyle}
      contentEditable={"true"}
      {...formContextData}
      onInput$={handleChange}
    />
  );
});
