import { component$, useContext, $, useSignal } from "@builder.io/qwik";
import { FormControlContext } from "~/common/hooks/useForm/useForm";
import {
  TextareaStyle,
  ButtonBaseStyle,
  ButtonStyleVariants,
} from "~/theme/components.css";

export const ControlledTextarea = component$(() => {
  const formContextData = useContext(FormControlContext);

  const internalData = useSignal<{ [key: string]: string }>({
    "123": "{{interpolation}}",
  });

  // const CustomButton = component$(({ index }) => {
  //     return <Button onClick$={ } />
  // })

  const handleChange = $((e: Event, target: HTMLDivElement) => {
    const replaceContent = (text: string) => {
      const newContent = text.replace(/{{[^}]*}}/g, (text) => {
        const newId = crypto.randomUUID();
        internalData.value = { ...internalData.value, [newId]: text };
        return `<span contenteditable="false" data-id="${newId}">&nbsp;
                            <button onclick="alert('hello')" class="${ButtonBaseStyle} ${ButtonStyleVariants.primary}" contenteditable="false">
                                Click Me
                            </button>&nbsp;
                        </span>`;
      });
      return newContent;
    };
    const getCaretPosition = (element: HTMLDivElement) => {
      let caretPosition = 0;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretPosition = preCaretRange.toString().length;
      }
      return caretPosition;
    };

    function setCaretPosition(element: HTMLDivElement, caretPos: number) {
      const range = document.createRange();
      const selection = window.getSelection();
      if (!selection) return;

      //   console.log(element.parentElement.childNodes);
      //   console.log(element);
      if (caretPos >= 0) {
        range.setStart(element.childNodes[0], caretPos);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
      }
    }

    let newValue = "";
    target.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        newValue += node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.nodeName === "SPAN") {
          const dataId: string = (node as Element).attributes["data-id" as any]
            .value;
          newValue += internalData.value[dataId] || "";
        } else {
          newValue += node.textContent || "";
          (node as Element).outerHTML = node.textContent || "";
        }
      }
    });

    // dataValue.value = newValue
    // htmlValue.value = replaceContent(target.innerHTML)

    // const newQc = target._qc_
    // newQc.$element$.innerHTML = htmlValue.value
    // const newTarget = { ...target, _qc_: newQc }
    // console.log(newTarget)
    // console.log(window.getSelection())
    // console.log(window.getSelection()?.toString())
    // debugger

    // {{hi}} hello {{hey}}

    // const originalCaretPosition = getCaretPosition(target);
    // let originalFocussedNode = -1;
    // let runningLength = 0;
    // let focussedNodeOffset = 0;
    // target.childNodes.forEach((node, index) => {
    //   const elementNode = node as Element;
    //   runningLength += elementNode.innerHTML
    //     ? elementNode.innerHTML.length
    //     : elementNode.textContent?.length || 0;
    //   if (
    //     originalCaretPosition < runningLength &&
    //     originalFocussedNode === -1
    //   ) {
    //     originalFocussedNode = index;
    //     focussedNodeOffset =
    //       elementNode.innerHTML.length -
    //       (runningLength - originalCaretPosition);
    //   }
    // });

    // console.log("original caret", originalCaretPosition);
    // console.log("original node", originalFocussedNode);
    // console.log("running length", runningLength);

    // console.log(e)
    // console.log(target)
    // console.log(newValue)
    formContextData.handleChange(null, null, newValue);
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);

      target.innerHTML = replaceContent(target.innerHTML);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    // let offset = 0;
    // target.childNodes.forEach((node) => {
    //   //   if (node.nodeType === Node.TEXT_NODE)
    //   // console.log("length", node.toString().length);
    //   /*else*/ if (node.nodeType === Node.ELEMENT_NODE) {
    //     // console.log("length", node.innerHTML.toString().length);
    //     offset += /*node.toString().length-*/ node.innerHTML.toString().length;
    //   }
    //   //   console.log(node.contentEditable);
    // });
    // // console.log(offset);
    // // console.log(target.innerHTML.length + offset);
    // setCaretPosition(target, target.innerHTML.length + offset);
    // // console.log(e);

    // console.log(target);
    // let newCaretPosition = 0;
    // let originalFocussedNode = -1
    // let runningLength = 0;
    // target.childNodes.forEach((node, index) => {
    //     const elementNode = node as Element
    //     runningLength += elementNode.innerHTML.length
    //     if (originalCaretPosition < runningLength && originalFocussedNode === -1) originalFocussedNode = index
    // })
  });

  // const { value, ...rest } = formContextData

  const test = $((e, target) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    let buttonNode = null;

    const traverseNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const regex = /{{[^}]*}}/g;
        const parts = text.split(regex);
        const content = [...text.matchAll(regex)];

        if (parts.length > 1) {
          const fragment = document.createDocumentFragment();

          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (part) {
              const textNode = document.createTextNode(part);
              fragment.appendChild(textNode);
            }

            if (i < parts.length - 1) {
              const button = document.createElement("button");

              button.textContent = "Click Me";
              button.contentEditable = "false";
              const newId = crypto.randomUUID();
              internalData.value = {
                ...internalData.value,
                [newId]: content[0][0],
              };
              content.splice(0, 1);
              button.setAttribute("data-id", newId);
              fragment.appendChild(button);
              buttonNode = button; // Store the reference to the button
            }
          }

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
    console.log(internalData.value);
    traverseNodes(target);

    // Set caret position after the inserted button
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
      onInput$={test}
    />
  );
});
