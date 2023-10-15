import { Signal, component$, useContext, $ } from "@builder.io/qwik";
import { GlobalContext } from "~/root";
import { Button } from "../button";
import {
  ModalContainerStyle,
  ModalDialogStyle,
  ModalWrapperStyle,
  ModalButtonStyle,
  ModalContentStyle,
} from "~/theme/components.css";

export const Modal = component$(
  ({ modalRef }: { modalRef: Signal<HTMLDialogElement> }) => {
    const globalContext = useContext(GlobalContext);

    const handleModalClose = $(() => {
      globalContext.modal.value?.close();
    });

    return (
      <>
        <dialog
          ref={modalRef}
          onClick$={handleModalClose}
          class={ModalDialogStyle}
        >
          <div class={ModalContainerStyle}>
            <div
              class={ModalWrapperStyle}
              onClick$={(e) => {
                e.stopPropagation();
              }}
            >
              <div class={ModalButtonStyle}>
                <Button onClick$={handleModalClose}>X</Button>
              </div>
              <div class={ModalContentStyle}>
                {globalContext.modalContent && <globalContext.modalContent />}
              </div>
            </div>
          </div>
        </dialog>
      </>
    );
  }
);
