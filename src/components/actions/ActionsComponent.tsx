import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { FormControlContext } from "~/common/hooks/useForm/useForm";
import { Action } from "~/models/Action";
import { ActionComponent } from "./ActionComponent";

export const ActionsComponent = component$(
  ({ emptyAction }: { emptyAction: Action }) => {
    const formControlContextData = useContext(FormControlContext);

    const actionsData = useSignal<Array<Action>>(formControlContextData.value);

    const swapUp = $(async (index: number) => {
      if (index === 0) return;
      const value = structuredClone(actionsData.value);

      const temp = value[index - 1];
      value[index - 1] = value[index];
      value[index] = temp;

      actionsData.value = [...value];
      await formControlContextData.handleChange(null, null, actionsData.value);
    });

    const swapDown = $(async (index: number) => {
      if (index === actionsData.value.length - 1) return;
      const value = structuredClone(actionsData.value);

      const temp = value[index + 1];
      value[index + 1] = value[index];
      value[index] = temp;

      actionsData.value = [...value];
      await formControlContextData.handleChange(null, null, actionsData.value);
    });

    return (
      <>
        {actionsData.value.map(({ id, content }: Action, index: number) => {
          return (
            <ActionComponent
              key={`${id}-${content}`}
              index={index}
              actionsData={actionsData.value}
              swapUp={swapUp}
              swapDown={swapDown}
            />
          );
        })}
        <Button
          onClick$={async () => {
            actionsData.value.splice(
              actionsData.value.length,
              0,
              structuredClone(emptyAction)
            );
            actionsData.value = [...actionsData.value];
          }}
        >
          +
        </Button>
      </>
    );
  }
);
