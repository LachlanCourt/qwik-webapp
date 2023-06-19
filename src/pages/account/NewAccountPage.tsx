import { component$ } from "@builder.io/qwik";
import { Button, ButtonVariant } from "~/components/button/Button";
import { Layout } from "~/components/layout/Layout";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { useForm } from "~/common/hooks/useForm/useForm";

const NewAccountPage = component$(() => {
  const initialValues = { email: "" };
  const { submitHandlers, Control, Form } = useForm(
    initialValues,
    "api/v1/accounts/new/"
  );
  return (
    <Layout>
      <Heading>Create New Account</Heading>
      <Form>
        <Control name="email" label="User Email">
          <Input type="email" />
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
          <Button {...submitHandlers}>Create</Button>
        </div>
      </Form>
    </Layout>
  );
});

export default NewAccountPage;
