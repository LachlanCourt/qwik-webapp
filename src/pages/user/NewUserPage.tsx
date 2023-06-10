import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/button";
import { Form } from "~/components/form/Form";
import { FormControl } from "~/components/formControl/FormControl";
import { Heading } from "~/components/heading/Heading";
import { Input } from "~/components/input/Input";
import { Layout } from "~/components/layout/Layout";
import { NewUserData } from "~/models";

export const NewUserPage = component$(({ data }: { data: NewUserData }) => {
  return (
    <Layout>
      <Heading>Welcome!</Heading>
      <Form action={`/api/v1/users/new?token=${data.token}`} method="POST">
        <FormControl>
          <label for="name-field">{"Display Name"}</label>
          <Input name="name" id="name-field" />
        </FormControl>
        <FormControl>
          <label for="password-field">Password</label>
          <Input name="password" id="password-field" type="password" />
        </FormControl>
        <Button type="submit">Sign up</Button>
      </Form>
    </Layout>
  );
});
