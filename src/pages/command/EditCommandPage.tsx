import { $, component$, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Command } from "@prisma/client";
import { Button } from "~/components/button";
import { ButtonVariant } from "~/components/button/Button";
import { Form } from "~/components/form/Form";
import { FormControl } from "~/components/formControl/FormControl";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { useDeleteCommand } from "./hooks/useDeleteCommand";
import { useLocation } from "~/common/hooks/useLocation";

export const EditCommandPage = component$(({ data }: { data?: Command }) => {
  const location = useLocation();
  const nav = useNavigate();

  const postEndpoint = data?.id ? `${data.id}` : `new`;
  const deleteCommand = useDeleteCommand();

  const handleDelete = $(() => {
    deleteCommand(data?.id || 0);

    nav(`${location.url.origin}/accounts/${data?.accountId}/commands`, true);
  });

  useVisibleTask$(({ track }) => {
    const submit = document.getElementById("submit-button");
    track(() => submit?.autofocus);
    if (submit) submit.focus();
  });

  // window.addEventListener("keydown", (event) => {
  //   const submitButton = document.querySelector('button[type="submit"]');

  //   if (event.key === "ENTER") {
  //     event.preventDefault();

  //     document.getElementsByTagName("form");
  //   }
  // });

  return (
    <Layout>
      <Heading>{data ? "Edit " : "Create New "}Command</Heading>
      <Form
        action={`/api/v1/accounts/${location.params.accountId}/commands/${postEndpoint}`}
        method="POST"
      >
        <FormControl>
          <label for="command-name">Command Name</label>
          <Input name="name" id="command-name" value={data?.name} />
        </FormControl>{" "}
        <FormControl>
          <label for="command-response">Command Response</label>
          <Input name="response" id="command-response" value={data?.response} />
        </FormControl>
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
          <Button id={"submit-button"} type="submit">
            {data ? "Save" : "Create"}
          </Button>
        </div>
      </Form>
    </Layout>
  );
});
