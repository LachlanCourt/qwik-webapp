import {
  $,
  QRL,
  component$,
  useContext,
  useContextProvider,
} from "@builder.io/qwik";
import { Button } from "~/components/button";
import { FormControlContext } from "~/common/hooks/useForm/useForm";
import { ControlledTextarea } from "../../components/controlledTextarea/ControlledTextarea";
import { ActionType } from "~/models/ActionType";
import { Action } from "~/models/Action";
import { interpolationOptions } from "./interpolationOptions";

export const ActionComponent = component$(
  ({
    index,
    actionsData,
    swapUp,
    swapDown,
  }: {
    index: number;
    actionsData: Array<Action>;
    swapUp: QRL<(index: number) => void>;
    swapDown: QRL<(index: number) => void>;
  }) => {
    const handleChange = $(
      (
        _: Event | null,
        __: HTMLInputElement | HTMLTextAreaElement | null,
        explicitNewValue?: string
      ) => {
        actionsData[index].content = explicitNewValue as string;
      }
    );

    const getValue = () => {
      if (actionsData[index].type === ActionType.RESPONSE) {
        return actionsData[index].content;
      }
    };

    const formControlContextData = useContext(FormControlContext);

    useContextProvider(FormControlContext, {
      ...formControlContextData,
      handleChange,
      value: getValue(),
    });

    return (
      <div style={{ display: "flex", gap: "0.3rem" }}>
        <ControlledTextarea
          selectOptions={interpolationOptions}
          index={index}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Button onClick$={$(() => swapUp(index))}>^</Button>
          <Button onClick$={$(() => swapDown(index))}>v</Button>
        </div>
      </div>
    );
  }
);
