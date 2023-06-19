import { component$ } from "@builder.io/qwik";
import { Button, ButtonVariant } from "~/components/button/Button";
import { Layout } from "~/components/layout/Layout";

import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { EditAccountData } from "~/models/Account";
import { useForm } from "~/common/hooks/useForm/useForm";

const EditAccountPage = component$(({ data }: { data: EditAccountData }) => {
  const initialValues = { name: data.name };
  const { submitHandlers, Control, Form } = useForm(
    initialValues,
    `api/v1/accounts/${data.id}`
  );

  return (
    <Layout>
      <Heading>Edit Account</Heading>
      <Form>
        <Control name="name" label="Account Name" isVertical>
          <i style={{ fontSize: "0.6rem" }}>
            This should match your twitch username
          </i>
          <Input style={{ width: "100%" }} />
        </Control>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "2rem",
            color: "darkslategray",
            fontWeight: "bold",
            gap: "0.6rem",
          }}
        >
          <Button link="../" variant={ButtonVariant.SECONDARY}>
            Cancel
          </Button>
          <Button {...submitHandlers}>Save</Button>
        </div>
      </Form>
    </Layout>
  );
});

export default EditAccountPage;
