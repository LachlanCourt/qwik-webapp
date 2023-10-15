import { $, component$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Command } from "@prisma/client";
import { Button } from "~/components/button";
import { ButtonVariant } from "~/components/button/Button";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { useDeleteCommand } from "./hooks/useDeleteCommand";
import { useLocation } from "~/common/hooks/useLocation";
import { useForm } from "~/common/hooks/useForm/useForm";
import { ControlledTextarea } from "../../components/controlledTextarea/ControlledTextarea";
import { OptionsType } from "~/components/controlledTextarea/Popup";

export const EditCommandPage = component$(({ data }: { data?: Command }) => {
  const location = useLocation();
  const nav = useNavigate();

  const postEndpoint = data?.id ? `${data.id}` : `new`;
  const initialValues = {
    name: data?.name || "",
    response: data?.response || "",
  };
  const { submitHandlers, Control, Form } = useForm(
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

  const interpolationOptions: Array<OptionsType> = [
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

  return (
    <Layout>
      <Heading>{data ? "Edit " : "Create New "}Command</Heading>
      <Form>
        <Control name="name" label="Command Name">
          <Input />
        </Control>
        <Control name="response" label="Command Response">
          <ControlledTextarea selectOptions={interpolationOptions} />
        </Control>
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
});
