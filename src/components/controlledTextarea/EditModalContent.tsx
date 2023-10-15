import { component$, useSignal, $, QRL, useTask$ } from "@builder.io/qwik";
import { OptionsType } from "./Popup";
import { Button } from "../button";
import { theme } from "~/common/styles/theme.css";

export type VariableSchema = Array<VariableDefinition>;

interface VariableDefinition {
  name: string;
  value: string;
  defaultValue: string;
}

export const EditModalContent = component$(
  ({
    option,
    onSubmit$,
    dataValue,
  }: {
    option: OptionsType | undefined;
    onSubmit$: QRL<(data: Array<string>) => void>;
    dataValue: Array<string>;
  }) => {
    if (!option) return <div />;
    if (!option.variableSchema) return <div>{option.name}</div>;

    const formValues = useSignal(dataValue);

    useTask$(({ track }) => {
      track(() => dataValue);
      formValues.value = dataValue;
    });

    return (
      <>
        {option.name}
        {option.variableSchema.map((variable, index) => {
          return (
            <div
              key={index}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {variable.name}
              <input
                onChange$={(e, target) => {
                  formValues.value[index] = target.value;
                }}
                value={formValues.value[index]}
              />
            </div>
          );
        })}
        <div style={{ paddingTop: theme.space.md }}>
          <Button onClick$={$(() => onSubmit$(formValues.value))}>Save</Button>
        </div>
      </>
    );
  }
);
