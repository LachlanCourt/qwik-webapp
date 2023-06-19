import { component$ } from "@builder.io/qwik";
import { useForm } from "~/common/hooks/useForm/useForm";
import { Button, ButtonVariant } from "~/components/button/Button";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { AddUserData } from "~/models/AddUserData";

export const AddUserPage = component$(({ accountId }: AddUserData) => {
  const initialValues = {
    email: "",
  };
  const { submitHandlers, Control, Form } = useForm(
    initialValues,
    `api/v1/users/adduser?accountId=${accountId}`
  );
  return (
    <Layout>
      <Heading>Add User</Heading>

      <Form>
        <Control
          isVertical
          name="email"
          label="Enter the email address of the user and they will be emailed a sign up link"
        >
          <Input type="email" style={{ width: "100%" }} />
        </Control>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.6rem",
          }}
        >
          <Button link={"../"} variant={ButtonVariant.SECONDARY}>
            Cancel
          </Button>
          <Button {...submitHandlers}>Send email</Button>
        </div>
      </Form>
    </Layout>
  );
});
