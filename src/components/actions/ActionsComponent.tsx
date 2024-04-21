import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { FormControlContext } from "~/common/hooks/useForm/useForm";
import { Action } from "~/models/Action";
import { ActionComponent } from "./ActionComponent";

export const ActionsComponent = component$(
  ({ emptyAction }: { emptyAction: Action }) => {
    const formControlContextData = useContext(FormControlContext);

    const actionsData = useSignal<Array<Action>>(formControlContextData.value);

    const swap = $(async (index: number, direction: 1 | -1) => {
      if (
        (direction === -1 && index === 0) ||
        (direction === 1 && index === actionsData.value.length - 1)
      )
        return;
      const value = structuredClone(actionsData.value);

      const temp = value[index + direction];
      value[index + direction] = value[index];
      value[index] = temp;

      actionsData.value = [...value];
      await formControlContextData.handleChange(null, null, actionsData.value);
    });

    const remove = $(async (index: number) => {
      const value = structuredClone(actionsData.value);
      value.splice(index, 1);
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
              swapUp={$((index: number) => swap(index, -1))}
              swapDown={$((index: number) => swap(index, 1))}
              remove={remove}
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
