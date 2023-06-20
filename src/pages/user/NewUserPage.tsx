import { component$ } from "@builder.io/qwik";
import { useForm } from "~/common/hooks/useForm/useForm";
import { Button } from "~/components/button";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { NewUserData } from "~/models";

export const NewUserPage = component$(({ data }: { data: NewUserData }) => {
  const initialValues = {
    name: "",
    password: "",
    passwordConfirm: "",
  };
  const { submitHandlers, Control, Form } = useForm(
    initialValues,
    `api/v1/users/new?token=${data.token}`
  );
  return (
    <Layout>
      <Heading>Welcome!</Heading>
      <Form>
        <Control name="name" label="Display Name">
          <Input />
        </Control>
        <Control name="password" label="Password">
          <Input type="password" />
        </Control>
        <Control name="passwordConfirm" label="Confirm password">
          <Input type="password" />
        </Control>
        <Button {...submitHandlers}>Sign up</Button>
      </Form>
    </Layout>
  );
});
