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
import { ControlledTextarea } from "./hooks/ControlledTextarea";

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

  const interpolationOptions = [
    { name: "Current Uptime of Stream", value: "{{context:uptime}}" },
    { name: "Author of Message", value: "{{context:author}}" },
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
