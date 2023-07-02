import { component$, useContext, $, useSignal } from "@builder.io/qwik";
import { FormControlContext } from "~/common/hooks/useForm/useForm";
import { TextareaStyle, ButtonBaseStyle, ButtonStyleVariants } from "~/theme/components.css";

export enum NodeType {
    ELEMENT = 1,
    TEXT = 3,
}


export const ControlledTextarea = component$(() => {
    const formContextData = useContext(FormControlContext);

    const internalData = useSignal<{ [key: string]: string }>({ "123": "{{interpolation}}" })

    // const CustomButton = component$(({ index }) => {
    //     return <Button onClick$={ } />
    // })


    const handleChange = $((e: Event, target: (HTMLDivElement)/* & QwikInternal*/) => {
        const replaceContent = (text: string) => {
            const newContent = text.replace(/{{[^}]*}}/g, (text) => {
                const newId = crypto.randomUUID()
                internalData.value = { ...internalData.value, [newId]: text }
                return `<span contenteditable="false" data-id="${newId}">&nbsp;
                            <button onclick="alert('hello')" class="${ButtonBaseStyle} ${ButtonStyleVariants.primary}" contenteditable="false">
                                Click Me
                            </button>&nbsp;
                        </span>`
            })
            return newContent
        }
        // const getCaretPosition = (element: HTMLDivElement) => {
        //     let caretPosition = 0;
        //     const selection = window.getSelection();
        //     if (selection && selection.rangeCount > 0) {
        //         const range = selection.getRangeAt(0);
        //         const preCaretRange = range.cloneRange();
        //         preCaretRange.selectNodeContents(element);
        //         preCaretRange.setEnd(range.endContainer, range.endOffset);
        //         caretPosition = preCaretRange.toString().length;
        //     }
        //     return caretPosition;
        // }


        let newValue = ''
        target.childNodes.forEach((node) => {
            if (node.nodeType === NodeType.TEXT) {
                newValue += node.textContent
            } else if (node.nodeType === NodeType.ELEMENT) {
                if (node.nodeName === "SPAN") {
                    const dataId: string = (node as Element).attributes['data-id' as any].value
                    newValue += internalData.value[dataId] || ""
                }
                else {
                    newValue += (node.textContent || "");
                    (node as Element).outerHTML = node.textContent || "";
                }
            }
        })

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
        // const originalCaretPosition = getCaretPosition(target)
        // let originalFocussedNode = 1
        // console.log(e)
        // console.log(target)
        // console.log(newValue)
        formContextData.handleChange(null, null, newValue)
        target.innerHTML = replaceContent(target.innerHTML)
    })


    // const { value, ...rest } = formContextData

    return <div class={TextareaStyle} contentEditable={"true"} {...formContextData} onInput$={handleChange} />
})