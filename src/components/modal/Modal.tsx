import { Signal, component$, useContext, $ } from "@builder.io/qwik";
import { theme } from "~/common/styles/theme.css";
import { GlobalContext } from "~/root";
import { Button } from "../button";

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
          style={{
            width: "92vw",
            height: "92vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <div
              style={{
                background: "#DDDDFF",
                boxShadow: theme.boxShadow.md,
                borderRadius: theme.borderRadius.md,
              }}
              onClick$={(e) => {
                e.stopPropagation();
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingTop: theme.space.sm,
                  paddingRight: theme.space.sm,
                }}
              >
                <Button onClick$={handleModalClose}>X</Button>
              </div>
              <div
                style={{ padding: theme.space.xl, paddingTop: theme.space.sm }}
              >
                {globalContext.modalContent && <globalContext.modalContent />}
              </div>
            </div>
          </div>
        </dialog>
      </>
    );
  }
);
