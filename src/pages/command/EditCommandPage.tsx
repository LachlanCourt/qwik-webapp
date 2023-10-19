import {
  $,
  Signal,
  component$,
  useContext,
  useContextProvider,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Action, Command } from "@prisma/client";
import { Button } from "~/components/button";
import { ButtonVariant } from "~/components/button/Button";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { useDeleteCommand } from "./hooks/useDeleteCommand";
import { useLocation } from "~/common/hooks/useLocation";
import {
  FormContext,
  FormControlContext,
  FormControlContextType,
  useForm,
} from "~/common/hooks/useForm/useForm";
import { ControlledTextarea } from "../../components/controlledTextarea/ControlledTextarea";
import { OptionsType } from "~/components/controlledTextarea/Popup";
import { CommandPageData } from "~/models";
import { FormControlHorizontalStyle } from "~/theme/components.css";
import { ActionType } from "~/models/ActionType";

export const interpolationOptions: Array<OptionsType> = [
  {
    name: "Current Uptime of Stream",
    value: "{{context:uptime}}",
    buttonLabel: "Uptime",
    hasVariables: false,
  },
  {
    name: "Author of Message",
    value: "{{context:author}}",
    buttonLabel: "Author",
    hasVariables: false,
  },
  {
    name: "Channel Name",
    value: "{{context:channelName}}",
    buttonLabel: "Channel Name",
    hasVariables: false,
  },
  {
    name: "Message Content",
    value: "{{context:text}}",
    buttonLabel: "Message",
    hasVariables: false,
  },
  {
    name: "Time since user followed",
    value: "{{context:followage}}",
    buttonLabel: "Followage",
    hasVariables: false,
  },
  {
    name: "Mention a User",
    value: "{{context:mention:A}}",
    pattern: "{{context:mention:A}}",
    buttonLabel: "User",
    hasVariables: true,
    variableSchema: [{ name: "Username", value: "A", defaultValue: "" }],
  },
  {
    name: "Pick a random number",
    value: "{{util:random:A:B}}",
    pattern: "{{util:random:A:B}}",
    buttonLabel: "Random",
    hasVariables: true,
    variableSchema: [
      { name: "Min", value: "A", defaultValue: "0" },
      { name: "Max", value: "B", defaultValue: "100" },
    ],
  },
];

export const ActionComponent = component$(
  ({
    formControlContextData,
    index,
    actionsData,
  }: {
    formControlContextData: FormControlContextType;
    index: number;
    actionsData: Array<Action>;
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
    useContextProvider(FormControlContext, {
      ...formControlContextData,
      handleChange,
      value: getValue(),
    });
    return <ControlledTextarea selectOptions={interpolationOptions} />;
  }
);

export const ActionsComponent = component$(() => {
  const formControlContextData = useContext(FormControlContext);
  const formContextData = useContext(FormContext);

  // useTask$(({ track }) => {
  //   console.log(formContextData.formValues);
  //   track(formContextData.formValues.value);
  // });

  return (
    <>
      {formContextData.formValues.value.actions.map(
        (_: Action, index: number) => {
          // We need to base this map off the form context rather than the control context in order to rerender
          // as the form context value is not a signal but is instead a subset of the formValues signal
          return (
            <ActionComponent
              key={index}
              formControlContextData={formControlContextData}
              index={index}
              actionsData={formControlContextData.value}
            />
          );
        }
      )}
    </>
  );
});

export const EditCommandPage = component$(
  ({ data }: { data?: CommandPageData }) => {
    const location = useLocation();
    const nav = useNavigate();

    const postEndpoint = data?.id ? `${data.id}` : `new`;
    const initialValues = {
      name: data?.name || "",
      actions: data?.actions || [],
    };
    const { submitHandlers, Control, Form, formValues } = useForm(
      initialValues,
      `/api/v1/accounts/${location.params.accountId}/commands/${postEndpoint}`,
      {},
      "POST",
      false
    );

    const deleteCommand = useDeleteCommand();
    const handleDelete = $(() => {
      deleteCommand(data?.id || 0);
      nav(`${location.url.origin}/accounts/${data?.accountId}/commands`, true);
    });

    return (
      <Layout>
        <Heading>{data ? "Edit " : "Create New "}Command</Heading>
        <Form>
          <Control name="name" label="Command Name">
            <Input />
          </Control>
          <label class={FormControlHorizontalStyle}>Command Actions</label>

          <Control name="actions" label="" isVertical>
            <ActionsComponent />
          </Control>
          <Button
            onClick$={() => {
              formValues.value.actions.splice(
                formValues.value.actions.length,
                0,
                { type: ActionType.RESPONSE, content: "" }
              );
              formValues.value = {
                ...formValues.value,
              };
            }}
          >
            +
          </Button>
          <div
            style={{ display: "flex", gap: "0.6rem", justifyContent: "center" }}
          >
            {data && (
              <Button
                preventdefault:click
                onClick$={handleDelete}
                variant={ButtonVariant.SECONDARY}
              >
                Delete
              </Button>
            )}
            <Button link={"../"} variant={ButtonVariant.SECONDARY}>
              {data ? "Discard Changes" : "Cancel"}
            </Button>
            <Button {...submitHandlers}>{data ? "Save" : "Create"}</Button>
          </div>
        </Form>
      </Layout>
    );
  }
);
